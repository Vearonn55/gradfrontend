import React, { useState } from "react";
import ExportInventoryButton from "./ExportInventoryButton";
import InventoryStatus from "./InventoryStatus";
import ProductDetailsView from "./ProductDetailsView";
import "./InventoryPage.css";


interface InventoryItem {
    id: number;
    name: string;
    stock: number;
    price: number;
    category: string;
    threshold: number;
    description?: string;
}

const sampleInventory: InventoryItem[] = [
    { id: 1, name: "Laptop", stock: 3, price: 1200, category: "Electronics", threshold: 5, description: "High-performance laptop" },
    { id: 2, name: "Headphones", stock: 15, price: 200, category: "Accessories", threshold: 5, description: "Noise-canceling headphones" },
    { id: 3, name: "Mouse", stock: 1, price: 50, category: "Accessories", threshold: 5, description: "Wireless mouse" },
];

export default function InventoryPage() {
    const [inventory, setInventory] = useState<InventoryItem[]>(sampleInventory);
    const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);

    const handleSelectProduct = (productId: number) => {
        const product = inventory.find((item) => item.id === productId) || null;
        setSelectedProduct(product);
    };

    const handleCloseDetails = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="inventory-container">
            <h2>Inventory Management</h2>

            {/* Stok Durumu (Düşük Stok Uyarıları) */}
            <InventoryStatus items={inventory} onSelectItem={handleSelectProduct} />

            {/* Ürün Detay Görüntüleme */}
            {selectedProduct && <ProductDetailsView product={selectedProduct} onClose={handleCloseDetails} />}

            {/* CSV / PDF Export */}
            <ExportInventoryButton items={inventory} />
        </div>
    );
}
