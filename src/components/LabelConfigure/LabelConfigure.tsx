import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LabelConfigure.css';
import { API_BASE_URL } from '../../config';

interface ESLTag {
  ESLID: number;
  MACAddress: string;
  ProductID: number | null;
}

interface Product {
  ProductID: number;
  Name: string;
}

const LabelConfigure: React.FC = () => {
  const [eslTags, setEslTags] = useState<ESLTag[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const [eslRes, productRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/esltag`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_BASE_URL}/api/products`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setEslTags(eslRes.data);
        setProducts(productRes.data);
      } catch (err: any) {
        console.error("Error fetching data:", err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  const handleAssignProduct = async (mac: string, newProductID: number) => {
  try {
    const token = localStorage.getItem('authToken');
    await axios.patch(
      `${API_BASE_URL}/api/esltag/mac/${mac}`,
      { ProductID: newProductID },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const updatedEslTags = await axios.get(`${API_BASE_URL}/api/esltag`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEslTags(updatedEslTags.data);

    alert('Updated successfully!');
  } catch (error: any) {
    console.error("Update failed:", error.response?.data || error.message);
  }
};

  return (
    <div className="label-configure-container">
      <h2>ESL Tag Configuration</h2>
      <table className="label-configure-table">
        <thead>
          <tr>
            <th>MAC Address</th>
            <th>Current Product</th>
            <th>New Product</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {eslTags.map((tag) => (
            <tr key={tag.ESLID}>
              <td>{tag.MACAddress}</td>
              <td>{products.find(p => p.ProductID === tag.ProductID)?.Name || 'Unassigned'}</td>
              <td>
                <select
                  value={selectedProducts[tag.ESLID] || ''}
                  onChange={(e) =>
                    setSelectedProducts(prev => ({
                      ...prev,
                      [tag.ESLID]: parseInt(e.target.value)
                    }))
                  }
                >
                  <option value="">Select Product</option>
                  {products.map((p) => (
                    <option key={p.ProductID} value={p.ProductID}>{p.Name}</option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  onClick={() => handleAssignProduct(tag.MACAddress, selectedProducts[tag.ESLID])}
                  disabled={!selectedProducts[tag.ESLID]}
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LabelConfigure;
