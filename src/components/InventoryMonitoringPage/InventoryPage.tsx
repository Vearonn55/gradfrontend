// src/components/InventoryMonitoringPage/InventoryPage.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useProducts, Product } from "../context/ProductContext";
import "./InventoryPage.css";

export default function InventoryPage() {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();

    const [form, setForm] = useState<{
        id: string;
        name: string;
        category: string;
        stock: string;
        weight: string;
        price: string;
        description: string;
        date: string;
    }>({
        id: "",
        name: "",
        category: "",
        stock: "",
        weight: "",
        price: "",
        description: "",
        date: new Date().toISOString().slice(0, 10),
    });

    const [editingId, setEditingId] = useState<number | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { id, name, category, stock, weight, price, description, date } = form;
        if (!id.trim() || !name.trim() || !category.trim()) return;

        // build the payload inline
        const payload = {
            id: parseInt(id, 10),
            name: name.trim(),
            category: category.trim(),
            stock: Number(stock) || 0,
            weight: Number(weight) || 0,
            price: Number(price) || 0,
            description: description.trim(),
            createdAt: date,
        };

        if (editingId === null) {
            addProduct(payload);
        } else {
            updateProduct(editingId, payload);
            setEditingId(null);
        }

        setForm({
            id: "",
            name: "",
            category: "",
            stock: "",
            weight: "",
            price: "",
            description: "",
            date: new Date().toISOString().slice(0, 10),
        });
    };

    const startEdit = (p: Product) => {
        setEditingId(p.id);
        setForm({
            id: p.id.toString(),
            name: p.name,
            category: p.category,
            stock: p.stock.toString(),
            weight: p.weight.toString(),
            price: p.price.toString(),
            description: p.description || "",
            date: p.createdAt.slice(0, 10),
        });
    };

    return (
        <div className="inventory-page-container">
            <h2>Inventory Management</h2>

            <form className="inventory-form" onSubmit={handleSubmit}>
                <input
                    name="id"
                    type="number"
                    placeholder="#123"
                    value={form.id}
                    onChange={handleInputChange}
                    required
                />
                <input
                    name="name"
                    type="text"
                    placeholder="Ürün Adı"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    name="category"
                    type="text"
                    placeholder="Kategori"
                    value={form.category}
                    onChange={handleInputChange}
                    required
                />
                <input
                    name="stock"
                    type="number"
                    placeholder="Adet"
                    value={form.stock}
                    onChange={handleInputChange}
                    min={0}
                    required
                />
                <input
                    name="weight"
                    type="number"
                    placeholder="Birim"
                    value={form.weight}
                    onChange={handleInputChange}
                    min={0}
                    required
                />
                <input
                    name="price"
                    type="number"
                    placeholder="Fiyat"
                    step="0.01"
                    value={form.price}
                    onChange={handleInputChange}
                    min={0}
                    required
                />
                <input
                    name="description"
                    type="text"
                    placeholder="Açıklama"
                    value={form.description}
                    onChange={handleInputChange}
                />
                <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="submit-btn">
                    {editingId === null ? "Oluştur" : "Kaydet"}
                </button>
            </form>

            <div className="inventory-list">
                <h3>Current Inventory</h3>
                <ul>
                    {products.map(p => (
                        <li key={p.id} className="item-row">
                            <div className="item-info">
                                <div className="item-text">
                                    <strong>#{p.id}</strong> – {p.name} – {p.category} – {p.stock} adet –{" "}
                                    {p.weight} birim – ${p.price.toFixed(2)} – eklendi:{" "}
                                    {p.createdAt.slice(0, 10)}
                                    {p.description && <em> ({p.description})</em>}
                                </div>
                                <div className="item-actions">
                                    <button onClick={() => startEdit(p)}>Edit</button>
                                    <button onClick={() => deleteProduct(p.id)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
