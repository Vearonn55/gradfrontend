import React, { useState } from 'react';
import './SearchBar.css';

export interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchQuery.trim());
    };

    return (
        <form className="search-bar-container" onSubmit={handleSubmit}>
            <input
                type="text"
                className="search-bar-input"
                placeholder={placeholder || 'Search products...'}
                value={searchQuery}
                onChange={handleChange}
            />
            <button type="submit" className="search-bar-btn">🔍</button>
        </form>
    );
};

export default SearchBar;
