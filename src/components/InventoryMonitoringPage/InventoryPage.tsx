import React, { useState, useEffect } from "react";
import axios from "axios";
import "./InventoryPage.css";

interface Product {
    ProductID: number;
    Name: string;
    Description: string;
    NutritionalFacts: string;
    CategoryID: number;
    Price: number;
    ExpiryDate: string;
    StockQuantity: number;
    [key: string]: any;
}

export default function InventoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<Product>>({});
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch("http://localhost:5050/api/products");
        const data = await res.json();
        setProducts(data);
    };

    const startEdit = (productId: number) => {
        const product = products.find(p => p.ProductID === productId);
        if (product) {
            setEditForm({ ...product });
            setEditingId(productId);
            setShowEditForm(true);
        }
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5050/api/products/${editingId}`, {
                ProductID: editForm.ProductID,
                Name: editForm.Name,
                Description: editForm.Description,
                NutritionalFacts: editForm.NutritionalFacts,
                Price: editForm.Price,
                StockQuantity: editForm.StockQuantity
            });
            setShowEditForm(false);
            setEditingId(null);
            fetchProducts();
        } catch (err) {
            console.error("Failed to save:", err);
        }
    };

    const handleDelete = async (productId: number) => {
        try {
            await axios.delete(`http://localhost:5050/api/products/${productId}`);
            fetchProducts();
        } catch (err) {
            console.error("Failed to delete product:", err);
        }
    };

    return (
        <div className="inventory-page">
            <div>
                <h2>Inventory Management</h2>

                {showEditForm && (
                    <div className="edit-form">
                        <input
                            type="number"
                            value={editForm.ProductID || ""}
                            onChange={e => setEditForm({ ...editForm, ProductID: Number(e.target.value) })}
                            placeholder="Product ID"
                        />
                        <input
                            type="text"
                            value={editForm.Name || ""}
                            onChange={e => setEditForm({ ...editForm, Name: e.target.value })}
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            value={editForm.Description || ""}
                            onChange={e => setEditForm({ ...editForm, Description: e.target.value })}
                            placeholder="Description"
                        />
                        <input
                            type="text"
                            value={editForm.NutritionalFacts || ""}
                            onChange={e => setEditForm({ ...editForm, NutritionalFacts: e.target.value })}
                            placeholder="Nutritional Facts"
                        />
                        <input
                            type="number"
                            value={editForm.Price || ""}
                            onChange={e => setEditForm({ ...editForm, Price: Number(e.target.value) })}
                            placeholder="Price"
                        />
                        <input
                            type="number"
                            value={editForm.StockQuantity || ""}
                            onChange={e => setEditForm({ ...editForm, StockQuantity: Number(e.target.value) })}
                            placeholder="Stock Quantity"
                        />
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setShowEditForm(false)}>Cancel</button>
                    </div>
                )}

                <table>
                    <thead>
                        <tr>
                            <th>ProductID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Nutritional Facts</th>
                            <th>Expiry Date</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.ProductID}>
                                <td>{product.ProductID}</td>
                                <td>{product.Name}</td>
                                <td>{product.Description}</td>
                                <td>{product.NutritionalFacts}</td>
                                <td>{product.ExpiryDate}</td>
                                <td>{product.Price}</td>
                                <td>{product.StockQuantity}</td>
                                <td><button onClick={() => startEdit(product.ProductID)}>Edit</button></td>
                                <td><button onClick={() => handleDelete(product.ProductID)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
