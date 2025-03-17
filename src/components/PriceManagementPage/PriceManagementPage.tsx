import React, { useState } from "react";
import EditablePriceTable from "./EditablePriceTable";
import FilterSortOptions from "./FilterSortOptions";
import SearchBar from "./SearchBar";
import "./PriceManagementPage.css"; // CSS dosyanın adı bu olacak, tasarım için bunu oluşturmalısın.

const sampleProducts = [
    { id: 1, name: "Product A", currentPrice: 100 },
    { id: 2, name: "Product B", currentPrice: 150 },
    { id: 3, name: "Product C", currentPrice: 200 },
];

export default function PriceManagementPage() {
    const [products, setProducts] = useState(sampleProducts);
    const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedStockLevel, setSelectedStockLevel] = useState("");
    const [selectedSort, setSelectedSort] = useState("");

    const handlePriceUpdate = (productId: number, newPrice: number) => {
        setProducts((prev) =>
            prev.map((p) =>
                p.id === productId ? { ...p, currentPrice: newPrice } : p
            )
        );
    };

    const handleSearch = (query: string) => {
        const lowerQuery = query.toLowerCase();
        setFilteredProducts(products.filter((p) => p.name.toLowerCase().includes(lowerQuery)));
    };

    return (
        <div className="price-management-container">
            <h2>Real Time Pricing</h2>

            <SearchBar onSearch={handleSearch} />

            <FilterSortOptions
                categories={["Electronics", "Clothing", "Home Appliances"]}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                stockLevels={["In Stock", "Out of Stock"]}
                selectedStockLevel={selectedStockLevel}
                onStockLevelChange={setSelectedStockLevel}
                sortOptions={["Price: Low to High", "Price: High to Low"]}
                selectedSort={selectedSort}
                onSortChange={setSelectedSort}
            />

            <EditablePriceTable
                products={filteredProducts}
                onPriceUpdate={handlePriceUpdate}
            />
        </div>
    );
}
