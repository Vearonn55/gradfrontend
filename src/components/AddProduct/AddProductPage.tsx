import React, { useState } from "react";
import "./AddProductPage.css";

export default function AddProductPage() {
    const today = new Date().toISOString().split('T')[0];

    const [form, setForm] = useState({
        name: "",
        description: "",
        nutritionalFacts: "",
        categoryId: "",
        price: "",
        expiryDate: today,
        stockQuantity: ""
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

         const token = localStorage.getItem("authToken");

        const newProduct = {
            Name: form.name,
            Description: form.description,
            NutritionalFacts: form.nutritionalFacts,
            CategoryID: parseInt(form.categoryId),
            Price: parseFloat(form.price),
            ExpiryDate: form.expiryDate,
            StockQuantity: parseInt(form.stockQuantity)
        };

        try {
            const res = await fetch("http://localhost:5050/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, 
                body: JSON.stringify(newProduct)
            });

            if (res.ok) {
                alert("Product added successfully.");
                setForm({
                    name: "",
                    description: "",
                    nutritionalFacts: "",
                    categoryId: "",
                    price: "",
                    expiryDate: today,
                    stockQuantity: ""
                });
            } else {
                alert("Failed to add product.");
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <h2>Add New Product</h2>
            <div className="form-grid">
                <div className="form-left">
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" required />
                    <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
                    <textarea name="nutritionalFacts" value={form.nutritionalFacts} onChange={handleChange} placeholder="Nutritional Facts" />
                </div>
                <div className="form-right">
                    <input name="categoryId" type="number" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required />
                    <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required />
                    <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} />
                    <input name="stockQuantity" type="number" value={form.stockQuantity} onChange={handleChange} placeholder="Stock Quantity" required />
                </div>
            </div>
            <button type="submit">Add Product</button>
        </form>
    );
}
