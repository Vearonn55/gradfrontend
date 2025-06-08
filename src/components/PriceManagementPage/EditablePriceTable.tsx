import React, { useState, useEffect } from "react";
import "./EditablePriceTable.css";

export interface TableProduct {
    id: number;        // React key
    productId: number; // your product’s ID
    name: string;
    currentPrice: number;
}

interface EditablePriceTableProps {
    products: TableProduct[];
    onPriceUpdate: (productId: number, newPrice: number) => void;
}

const EditablePriceTable: React.FC<EditablePriceTableProps> = ({
                                                                   products,
                                                                   onPriceUpdate,
                                                               }) => {
    const [drafts, setDrafts] = useState<Record<number, string>>({});

    useEffect(() => {
        // clear out drafts when products list changes
        setDrafts(prev => {
            const next: Record<number, string> = {};
            products.forEach(p => {
                if (prev[p.id] !== undefined) next[p.id] = prev[p.id];
            });
            return next;
        });
    }, [products]);

    const handleChange = (id: number, value: string) => {
        setDrafts(d => ({ ...d, [id]: value }));
    };

    const handleUpdate = (row: TableProduct) => {
        const raw = drafts[row.id]?.trim();
        const num = raw === "" || raw == null ? row.currentPrice : parseFloat(raw);
        if (isNaN(num)) {
            alert("Lütfen geçerli bir sayı girin.");
            return;
        }
        onPriceUpdate(row.productId, num);
        setDrafts(d => {
            const c = { ...d };
            delete c[row.id];
            return c;
        });
    };

    return (
        <table className="price-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Ürün</th>
                <th>Mevcut Fiyat</th>
                <th>Yeni Fiyat</th>
                <th>Güncelle</th>
            </tr>
            </thead>
            <tbody>
            {products.map(row => (
                <tr key={row.id}>
                    <td>#{row.productId}</td>
                    <td>{row.name}</td>
                    <td>${row.currentPrice.toFixed(2)}</td>
                    <td>
                        <input
                            type="number"
                            className="price-input"
                            value={drafts[row.id] ?? ""}
                            onChange={e => handleChange(row.id, e.target.value)}
                            placeholder={row.currentPrice.toFixed(2)}
                            step="0.01"
                        />
                    </td>
                    <td>
                        <button onClick={() => handleUpdate(row)}>Update</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default EditablePriceTable;
