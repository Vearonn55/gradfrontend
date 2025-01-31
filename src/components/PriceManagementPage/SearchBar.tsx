import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <form className="search-bar-container" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleChange}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
