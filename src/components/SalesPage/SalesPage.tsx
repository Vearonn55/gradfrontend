import React, { useState, useEffect } from "react";
import { useProducts, Product } from "../context/ProductContext";
import { useSales, Sale } from "../context/SalesContext";
import "./SalesPage.css";

const SalesPage: React.FC = () => {
    const { products } = useProducts();
    const { sales, addSale, updateSale, deleteSale } = useSales();

    const [form, setForm] = useState({
        productId: "",
        quantity: "",
        unitPrice: 0,
        date: new Date().toISOString().slice(0, 16)
    });

    useEffect(() => {
        const matched = products.find(p => p.id === parseInt(form.productId));
        setForm(f => ({
            ...f,
            unitPrice: matched ? matched.price : 0
        }));
    }, [form.productId, products]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const id = parseInt(form.productId);
        const qty = parseInt(form.quantity);
        if (!id || !qty || qty < 1) return;

        const today = new Date().toISOString().split("T")[0];
        const existing = sales.find(s =>
            s.productId === id &&
            new Date(s.date).toISOString().split("T")[0] === today
        );

        if (existing) {
            updateSale(existing.id, { quantity: existing.quantity + qty });
            alert(`Updated existing sale. New quantity: ${existing.quantity + qty}`);
        } else {
            addSale({
                productId: id,
                quantity: qty,
                unitPrice: form.unitPrice,
                date: form.date
            });
        }

        setForm(f => ({ ...f, quantity: "" }));
    };

    const handleDropdownChange = (id: number) => {
        setForm(f => ({ ...f, productId: id.toString() }));
    };

    const totalSales = sales.reduce((sum, s) => sum + (s.quantity * s.unitPrice), 0);

    return (
        <div className="sales-page-container">
            <h2>Sales</h2>
            <form className="sales-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Product</label>
                        <select
                            value={form.productId}
                            onChange={e => handleDropdownChange(+e.target.value)}
                        >
                            <option value="">Select Product</option>
                            {products.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Product ID</label>
                        <input
                            type="number"
                            name="productId"
                            value={form.productId}
                            onChange={e => setForm(f => ({ ...f, productId: e.target.value }))}
                            placeholder="Enter Product ID"
                        />
                    </div>

                    <div className="form-group">
                        <label>Unit Price</label>
                        <div className="price-display">
                            ${typeof form.unitPrice === "number" ? form.unitPrice.toFixed(2) : "0.00"}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Quantity</label>
                        <div className="quantity-control">
                            <input
                                type="number"
                                min={1}
                                name="quantity"
                                value={form.quantity}
                                onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
                                placeholder="Enter Quantity"
                                style={{ width: "100px" }}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Total</label>
                        <div className="price-display">
                            ${(Number(form.quantity) * form.unitPrice).toFixed(2)}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="datetime-local"
                            value={form.date}
                            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                        />
                    </div>
                </div>
                <button type="submit" className="submit-btn">Checkout</button>
            </form>

            <div className="sales-list">
                <h3>Checkout</h3>
                <div className="sales-table">
                    <div className="table-header">
                        <div className="table-row">
                            <div className="cell">Sale #</div>
                            <div className="cell">Product</div>
                            <div className="cell">Quantity</div>
                            <div className="cell">Unit Price</div>
                            <div className="cell">Total</div>
                            <div className="cell">Date</div>
                            <div className="cell">Actions</div>
                        </div>
                    </div>
                    <div className="table-body">
                        {sales.map((s: Sale, index) => {
                            const prod = products.find(p => p.id === s.productId);
                            const total = s.quantity * s.unitPrice;
                            return (
                                <div className="table-row" key={s.id}>
                                    <div className="cell">#{index + 1}</div>
                                    <div className="cell">{prod?.name || "—"}</div>
                                    <div className="cell quantity-cell">
                                        <button
                                            className="quantity-btn small"
                                            onClick={() => updateSale(s.id, { quantity: Math.max(1, s.quantity - 1) })}
                                        >-</button>
                                        <span>{s.quantity}</span>
                                        <button
                                            className="quantity-btn small"
                                            onClick={() => updateSale(s.id, { quantity: s.quantity + 1 })}
                                        >+</button>
                                    </div>
                                    <div className="cell">${s.unitPrice.toFixed(2)}</div>
                                    <div className="cell">${total.toFixed(2)}</div>
                                    <div className="cell">{new Date(s.date).toLocaleString()}</div>
                                    <div className="cell">
                                        <button className="delete-btn" onClick={() => deleteSale(s.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="sales-total">
                    <h3>Subtotal: ${totalSales.toFixed(2)}</h3>
                    <button className="submit-btn">Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default SalesPage;
