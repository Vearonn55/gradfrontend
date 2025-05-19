import React from 'react';

interface AlertFilterProps {
    selectedType: string;
    onTypeChange: (type: string) => void;
}

const AlertFilter: React.FC<AlertFilterProps> = ({ selectedType, onTypeChange }) => {
    return (
        <div className="alert-filter-container">
            <label htmlFor="alertTypeSelect">Filter by Type:</label>
            <select
                id="alertTypeSelect"
                className="form-input"
                value={selectedType}
                onChange={(e) => onTypeChange(e.target.value)}
            >
                <option value="All">All Alerts</option>
                <option value="PriceThresholdExceeded">Price Threshold Exceeded</option>
             
            </select>
        </div>
    );
};

export default AlertFilter;
