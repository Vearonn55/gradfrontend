import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import "./AddProductPage.css";

export default function AddProductPage() {
    // Bugünün tarihini YYYY-MM-DD formatında alıyorum
    const today = new Date().toISOString().split('T')[0];

    const { addProduct } = useProducts();

    const [form, setForm] = useState({
        name: "",
        description: "",
        nutritionalFacts: "",
        categoryId: "",
        price: "",
        expiryDate: today, // Bugünün tarihini varsayılan değer olarak atıyorum
        stockQuantity: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        addProduct({
            name: form.name,
            description: form.description,
            nutritionalFacts: form.nutritionalFacts,
            categoryId: parseInt(form.categoryId),
            price: parseFloat(form.price),
            expiryDate: form.expiryDate,
            stockQuantity: parseInt(form.stockQuantity)
        });

        alert("Product Added Successfully!");
        setForm({
            name: "",
            description: "",
            nutritionalFacts: "",
            categoryId: "",
            price: "",
            expiryDate: today,
            stockQuantity: ""
        });
    };

    return (
        <div className="page-container">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="form-row">
                    <div className="form-group">
                        <input className="form-input" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
                        <textarea className="form-textarea" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                        <textarea className="form-textarea" name="nutritionalFacts" placeholder="Nutritional Facts" value={form.nutritionalFacts} onChange={handleChange} />
                    </div>
                    
                    <div className="form-group">
                        <input className="form-input" name="categoryId" type="number" placeholder="Category ID" value={form.categoryId} onChange={handleChange} required />
                        <input className="form-input" name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required />
                        <input className="form-input" name="expiryDate" type="date" placeholder="Expiry Date" value={form.expiryDate} onChange={handleChange} required />
                        <input className="form-input" name="stockQuantity" type="number" placeholder="Stock Quantity" value={form.stockQuantity} onChange={handleChange} required />
                    </div>
                </div>
                
                <div className="button-container">
                    <button type="submit" className="action-btn primary-btn">Add Product</button>
                </div>
            </form>
        </div>
    );
}
