import React from 'react';


interface FilterSortOptionsProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;

    stockLevels: string[];
    selectedStockLevel: string;
    onStockLevelChange: (stockLevel: string) => void;

    sortOptions: string[];
    selectedSort: string;
    onSortChange: (sort: string) => void;
}

const FilterSortOptions: React.FC<FilterSortOptionsProps> = ({
                                                                 categories,
                                                                 selectedCategory,
                                                                 onCategoryChange,
                                                                 stockLevels,
                                                                 selectedStockLevel,
                                                                 onStockLevelChange,
                                                                 sortOptions,
                                                                 selectedSort,
                                                                 onSortChange,
                                                             }) => {
    return (
        <div className="filter-sort-container">
            <div className="filter-group">
                <label htmlFor="categorySelect">Category:</label>
                <select
                    id="categorySelect"
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="stockSelect">Stock Level:</label>
                <select
                    id="stockSelect"
                    value={selectedStockLevel}
                    onChange={(e) => onStockLevelChange(e.target.value)}
                >
                    <option value="">All Levels</option>
                    {stockLevels.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="sortSelect">Sort By:</label>
                <select
                    id="sortSelect"
                    value={selectedSort}
                    onChange={(e) => onSortChange(e.target.value)}
                >
                    {sortOptions.map((sortOpt) => (
                        <option key={sortOpt} value={sortOpt}>
                            {sortOpt}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FilterSortOptions;
