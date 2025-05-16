import React, { useState, useEffect } from "react";
import { useProducts, Product } from "../context/ProductContext";
import SearchBar from "../PriceManagementPage/SearchBar";
import EditablePriceTable, { TableProduct } from "./EditablePriceTable";
import "./PriceManagementPage.css";

export default function PriceManagementPage() {
    const { products, updateProduct } = useProducts();
    const [searchResults, setSearchResults] = useState<TableProduct[]>([]);

    // map context → table rows (include ID)
    const toTable = (p: Product): TableProduct => ({
        id: p.id,
        productId: p.id,
        name: p.name,
        currentPrice: p.price,
    });

    useEffect(() => {
        setSearchResults(products.map(toTable));
    }, [products]);

    const handleSearch = (q: string) => {
        const lq = q.trim().toLowerCase();
        setSearchResults(
            !lq
                ? products.map(toTable)
                : products.filter(p => p.name.toLowerCase().includes(lq)).map(toTable)
        );
    };

    const handlePriceUpdate = (productId: number, newPrice: number) => {
        updateProduct(productId, { price: newPrice });
    };

    return (
        <div className="price-management-container">
            <h2>Real-Time Pricing</h2>

            <SearchBar onSearch={handleSearch} placeholder="Ürün ara…" />

            <EditablePriceTable
                products={searchResults}
                onPriceUpdate={handlePriceUpdate}
            />
        </div>
    );
}
