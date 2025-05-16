// src/components/SalesPage/SalesPage.tsx
import React, { useState } from "react";
import { useProducts, Product } from "../context/ProductContext";
import { useSales, Sale } from "../context/SalesContext";
import "./SalesPage.css";

const SalesPage: React.FC = () => {
    const { products } = useProducts();
    const { sales, addSale } = useSales();

    const [form, setForm] = useState({
        productId: products[0]?.id || 0,
        quantity: 1,
        date: new Date().toISOString().slice(0,16), // YYYY-MM-DDThh:mm
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.productId || form.quantity < 1) return;
        addSale({ productId: form.productId, quantity: form.quantity, date: form.date });
    };

    return (
        <div className="sales-page-container">
            <h2>Sales</h2>
            <form className="sales-form" onSubmit={handleSubmit}>
                <select
                    value={form.productId}
                    onChange={e => setForm(f=>({ ...f, productId: +e.target.value }))}
                >
                    {products.map((p:Product)=>
                        <option key={p.id} value={p.id}>{p.name}</option>
                    )}
                </select>
                <input
                    type="number"
                    min={1}
                    value={form.quantity}
                    onChange={e=>setForm(f=>({ ...f, quantity: +e.target.value }))}
                    placeholder="Quantity"
                />
                <input
                    type="datetime-local"
                    value={form.date}
                    onChange={e=>setForm(f=>({ ...f, date: e.target.value }))}
                />
                <button type="submit">Record Sale</button>
            </form>

            <div className="sales-list">
                <h3>Recorded Sales</h3>
                <ul>
                    {sales.map((s:Sale) => {
                        const prod = products.find(p=>p.id===s.productId);
                        return (
                            <li key={s.id}>
                                <span><strong>Sale #{s.id}</strong></span>
                                <span>Product: {prod?.name || "—"}</span>
                                <span>Qty: {s.quantity}</span>
                                <span>When: {new Date(s.date).toLocaleString()}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default SalesPage;
