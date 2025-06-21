import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SalesPage.css';
import { API_BASE_URL } from '../../config';

interface Product {
  ProductID: number;
  Name: string;
  Price: number;
}

const SalesPage: React.FC = () => {
  const [productID, setProductID] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sales, setSales] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [saleDate, setSaleDate] = useState(''); // new state

  const fetchSales = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${API_BASE_URL}/api/sales`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSales(response.data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${API_BASE_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, []);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedID = e.target.value;
    setProductID(selectedID);

    const selectedProduct = products.find(p => p.ProductID.toString() === selectedID);
    if (selectedProduct) {
      const numericPrice = Number(selectedProduct.Price);
      setUnitPrice(numericPrice);
      setTotalPrice(numericPrice * (parseInt(quantity) || 0));
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qty = e.target.value;
    setQuantity(qty);

    const parsedQty = parseInt(qty);
    if (!isNaN(parsedQty)) {
      setTotalPrice(unitPrice * parsedQty);
    } else {
      setTotalPrice(0);
    }
  };

  const handleCheckout = async () => {
    if (!productID || !quantity) {
      alert('Please select a product and enter quantity.');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      await axios.post(
        '/api/sales',
        {
          ProductID: parseInt(productID),
          Quantity: parseInt(quantity),
          SaleDateTime: saleDate ? new Date(saleDate).toISOString() : new Date().toISOString()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Reset fields
      setProductID('');
      setQuantity('');
      setUnitPrice(0);
      setTotalPrice(0);
      setSaleDate('');
      fetchSales();
    } catch (error) {
      console.error('Error logging sale:', error);
      alert('Sale failed. Please check inputs and login status.');
    }
  };

  return (
  <div className="sales-page-container">
    <div className="sales-card">
      <h2>Make a Sale</h2>

      <div className="sales-form">
        <select value={productID} onChange={handleProductChange}>
          <option value="">Select a Product</option>
          {products.map((product) => (
            <option key={product.ProductID} value={product.ProductID}>
              {product.Name}
            </option>
          ))}
        </select>

        <span className="unit-price">Unit Price: {unitPrice.toFixed(2)} ₺</span>

        <input
          type="number"
          placeholder="Enter Quantity"
          value={quantity}
          onChange={handleQuantityChange}
        />

        <span className="total-price">Total: {totalPrice.toFixed(2)} ₺</span>

        <input
          type="datetime-local"
          value={saleDate}
          onChange={(e) => setSaleDate(e.target.value)}
        />

        <button onClick={handleCheckout}>Checkout</button>
      </div>

      <h3>Sales History</h3>
      <div className="sales-table">
        <table>
          <thead>
            <tr>
              <th>Sale #</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.SaleID}>
                <td>{sale.SaleID}</td>
                <td>{sale.ProductID}</td>
                <td>{sale.Quantity}</td>
                <td>{new Date(sale.SaleDateTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
};

export default SalesPage;
