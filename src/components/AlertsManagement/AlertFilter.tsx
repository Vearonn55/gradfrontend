import React from 'react';

export interface AlertFilterProps {
    filterType: string;
    setFilterType: React.Dispatch<React.SetStateAction<string>>;
}

const AlertFilter: React.FC<AlertFilterProps> = ({ filterType, setFilterType }) => {
    return (
        <div>
            <label>Filter:</label>
            <select value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option value="All">All</option>
                <option value="PriceExceeded">PriceExceeded</option>
                <option value="NearExpiry">NearExpiry</option>
            </select>
        </div>
    );
};

export default AlertFilter;
