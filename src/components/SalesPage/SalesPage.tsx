// src/components/SalesPage/SalesPage.tsx
import React, { useState } from "react";
import { useProducts, Product } from "../context/ProductContext";
import { useSales, Sale } from "../context/SalesContext";
import "./SalesPage.css";

const SalesPage: React.FC = () => {
    const { products } = useProducts();
    const { sales, addSale, updateSale, deleteSale } = useSales();

    const [form, setForm] = useState({
        productId: products[0]?.id || 0,
        quantity: 1,
        unitPrice: products[0]?.price || 0,
        date: new Date().toISOString().slice(0,16), // YYYY-MM-DDThh:mm
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.productId || form.quantity < 1) return;

        // Aynı ürünün bugün yapılmış satışını bul
        const today = new Date().toISOString().split('T')[0];
        const existingSale = sales.find(s =>
            s.productId === form.productId &&
            new Date(s.date).toISOString().split('T')[0] === today
        );

        if (existingSale) {
            // Eğer aynı ürün bugün satılmışsa, miktarını güncelle
            updateSale(existingSale.id, {
                quantity: existingSale.quantity + form.quantity
            });
            // Kullanıcıya bilgi ver
            alert(`Existing sale updated! New quantity: ${existingSale.quantity + form.quantity}`);
        } else {
            // Yeni satış ekle
            addSale({
                productId: form.productId,
                quantity: form.quantity,
                unitPrice: form.unitPrice,
                date: form.date
            });
        }

        // Form miktarını sıfırla
        setForm(f => ({ ...f, quantity: 1 }));
    };

    const handleProductChange = (productId: number) => {
        const selectedProduct = products.find(p => p.id === productId);
        setForm(f => ({
            ...f,
            productId,
            unitPrice: selectedProduct?.price || 0
        }));
    };

    // Calculate total sales
    const totalSales = sales.reduce((sum, sale) =>
        sum + (sale.quantity * sale.unitPrice), 0
    );

    return (
        <div className="sales-page-container">
            <h2>Sales</h2>
            <form className="sales-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Product:</label>
                        <select
                            value={form.productId}
                            onChange={e => handleProductChange(+e.target.value)}
                        >
                            {products.map((p:Product)=>
                                <option key={p.id} value={p.id}>{p.name}</option>
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Unit Price:</label>
                        <div className="price-display">${form.unitPrice.toFixed(2)}</div>
                    </div>

                    <div className="form-group">
                        <label>Quantity:</label>
                        <div className="quantity-control">
                            <button
                                type="button"
                                onClick={() => setForm(f => ({ ...f, quantity: Math.max(1, f.quantity - 1) }))}
                                className="quantity-btn"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min={1}
                                value={form.quantity}
                                onChange={e=>setForm(f=>({ ...f, quantity: +e.target.value }))}
                                placeholder="Quantity"
                            />
                            <button
                                type="button"
                                onClick={() => setForm(f => ({ ...f, quantity: f.quantity + 1 }))}
                                className="quantity-btn"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Total:</label>
                        <div className="price-display">${(form.quantity * form.unitPrice).toFixed(2)}</div>
                    </div>

                    <div className="form-group">
                        <label>Date:</label>
                        <input
                            type="datetime-local"
                            value={form.date}
                            onChange={e=>setForm(f=>({ ...f, date: e.target.value }))}
                        />
                    </div>
              
                <button type="submit" className="submit-btn">Record Sale</button>
             </div> </form>

            <div className="sales-list">
                <h3>Recorded Sales</h3>
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
                        {sales.map((s:Sale) => {
                            const prod = products.find(p=>p.id===s.productId);
                            const total = s.quantity * s.unitPrice;
                            return (
                                <div className="table-row" key={s.id}>
                                    <div className="cell">#{s.id}</div>
                                    <div className="cell">{prod?.name || "—"}</div>
                                    <div className="cell quantity-cell">
                                        <button
                                            className="quantity-btn small"
                                            onClick={() => updateSale(s.id, { quantity: Math.max(1, s.quantity - 1) })}
                                        >
                                            -
                                        </button>
                                        <span>{s.quantity}</span>
                                        <button
                                            className="quantity-btn small"
                                            onClick={() => updateSale(s.id, { quantity: s.quantity + 1 })}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="cell">${s.unitPrice.toFixed(2)}</div>
                                    <div className="cell">${total.toFixed(2)}</div>
                                    <div className="cell">{new Date(s.date).toLocaleString()}</div>
                                    <div className="cell">
                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteSale(s.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="sales-total">
                    <h3>Total Sales: ${totalSales.toFixed(2)}</h3>
                </div>
            </div>
        </div>
    );
};

export default SalesPage;
