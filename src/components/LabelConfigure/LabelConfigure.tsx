import React, { useEffect, useState } from "react";
import "./LabelConfigure.css";

interface LabelData {
    labelId: string;
    productName: string;
}

const LabelConfigure: React.FC = () => {
    const [labels, setLabels] = useState<LabelData[]>(() => {
        const stored = localStorage.getItem("labels");
        return stored ? JSON.parse(stored) : [
            { labelId: "LBL-001", productName: "Product A" },
            { labelId: "LBL-002", productName: "Product B" },
            { labelId: "LBL-003", productName: "Product C" }
        ];
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
    const [editedProduct, setEditedProduct] = useState("");

    // Kalıcı hale getir
    useEffect(() => {
        localStorage.setItem("labels", JSON.stringify(labels));
    }, [labels]);

    // Yeni ürün eklendiyse AddProduct kısmından onu da Label olarak yakala
    useEffect(() => {
        const storedProducts = localStorage.getItem("inventory");
        if (storedProducts) {
            const products = JSON.parse(storedProducts);
            const generatedLabels: LabelData[] = products.map((p: any, idx: number) => ({
                labelId: `LBL-${(idx + 1).toString().padStart(3, "0")}`,
                productName: p.name
            }));

            setLabels(generatedLabels);
        }
    }, []);

    const handleEdit = (labelId: string, product: string) => {
        setEditingLabelId(labelId);
        setEditedProduct(product);
    };

    const handleSave = (labelId: string) => {
        setLabels(prev =>
            prev.map(label =>
                label.labelId === labelId
                    ? { ...label, productName: editedProduct }
                    : label
            )
        );
        setEditingLabelId(null);
        setEditedProduct("");
    };

    const handleDelete = (labelId: string) => {
        const updated = labels.filter(label => label.labelId !== labelId);
        setLabels(updated);
    };

    const filtered = labels.filter(label =>
        label.labelId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        label.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="label-configure-page">
            <h2>Label Configure</h2>

            <input
                type="text"
                placeholder="Search by Label ID or Product"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="search-input"
            />

            <table className="label-table">
                <thead>
                <tr>
                    <th>Label #</th>
                    <th>Product</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filtered.map(label => (
                    <tr key={label.labelId}>
                        <td>{label.labelId}</td>
                        <td>
                            {editingLabelId === label.labelId ? (
                                <input
                                    type="text"
                                    value={editedProduct}
                                    onChange={e => setEditedProduct(e.target.value)}
                                    className="edit-input"
                                />
                            ) : (
                                label.productName
                            )}
                        </td>
                        <td>
                            {editingLabelId === label.labelId ? (
                                <button
                                    onClick={() => handleSave(label.labelId)}
                                    className="save-btn"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEdit(label.labelId, label.productName)}
                                    className="edit-btn"
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(label.labelId)}
                                className="delete-btn"
                            >
                                Delete
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
