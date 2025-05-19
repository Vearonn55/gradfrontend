import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import "./InventoryPage.css";

export default function InventoryPage() {
    const { products, updateProduct, deleteProduct } = useProducts();

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<any>({});
    const [showEditForm, setShowEditForm] = useState(false);

    const startEdit = (productId: number) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            setEditingId(productId);
            setEditForm({ ...product });
            setShowEditForm(true);
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
        setShowEditForm(false);
    };

    const saveEdit = () => {
        if (editingId != null) {
            const updatedProduct = {
                ...editForm,
                price: parseFloat(editForm.price),
                categoryId: parseInt(editForm.categoryId),
                stockQuantity: parseInt(editForm.stockQuantity)
            };
            updateProduct(editingId, updatedProduct);
            cancelEdit();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditForm((prev: any) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="page-container">
            <h2>Inventory List</h2>
            
            {showEditForm ? (
                <div className="edit-product-form">
                    <h3>Edit Product #{editingId}</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Product Name</label>
                            <input 
                                className="form-input" 
                                name="name" 
                                value={editForm.name} 
                                onChange={handleChange} 
                            />
                            
                            <label>Description</label>
                            <textarea 
                                className="form-textarea" 
                                name="description" 
                                value={editForm.description} 
                                onChange={handleChange} 
                            />
                            
                            <label>Nutritional Facts</label>
                            <textarea 
                                className="form-textarea" 
                                name="nutritionalFacts" 
                                value={editForm.nutritionalFacts} 
                                onChange={handleChange} 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Category ID</label>
                            <input 
                                className="form-input" 
                                name="categoryId" 
                                type="number" 
                                value={editForm.categoryId} 
                                onChange={handleChange} 
                            />
                            
                            <label>Price</label>
                            <input 
                                className="form-input" 
                                name="price" 
                                type="number" 
                                step="0.01" 
                                value={editForm.price} 
                                onChange={handleChange} 
                            />
                            
                            <label>Expiry Date</label>
                            <input 
                                className="form-input" 
                                name="expiryDate" 
                                type="date" 
                                value={editForm.expiryDate} 
                                onChange={handleChange} 
                            />
                            
                            <label>Stock Quantity</label>
                            <input 
                                className="form-input" 
                                name="stockQuantity" 
                                type="number" 
                                value={editForm.stockQuantity} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    
                    <div className="button-container">
                        <button className="action-btn success-btn" onClick={saveEdit}>Save Changes</button>
                        <button className="action-btn secondary-btn" onClick={cancelEdit}>Cancel</button>
                    </div>
                </div>
            ) : (
                <table className="data-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Nutritional Facts</th>
                        <th>Category ID</th>
                        <th>Price</th>
                        <th>Expiry Date</th>
                        <th>Stock Quantity</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.description}</td>
                            <td>{p.nutritionalFacts}</td>
                            <td>{p.categoryId}</td>
                            <td>${typeof p.price === 'number' ? p.price.toFixed(2) : parseFloat(p.price).toFixed(2)}</td>
                            <td>{p.expiryDate}</td>
                            <td>{p.stockQuantity}</td>
                            <td>
                                <button className="action-btn primary-btn" onClick={() => startEdit(p.id)}>Edit</button>
                                <button className="action-btn danger-btn" onClick={() => deleteProduct(p.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
