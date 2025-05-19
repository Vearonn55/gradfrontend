import React, { useState } from 'react';


interface HelpSearchBarProps {
    onSearch: (query: string) => void;
}

const HelpSearchBar: React.FC<HelpSearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(searchQuery.trim());
    };

    return (
        <form className="help-search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search tutorials or FAQs..."
                value={searchQuery}
                onChange={handleChange}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default HelpSearchBar;
