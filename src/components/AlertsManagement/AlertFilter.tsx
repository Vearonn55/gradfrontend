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
                <option value="NearExpiry">Near Expiry</option>
                <option value="OutOfStock">Out of Stock</option>
                <option value="HighDemand">High Demand</option>
                <option value="StorageTemperatureIssue">Storage Temperature Issue</option>
                <option value="ShipmentDelay">Shipment Delay</option>
                <option value="UnauthorizedAccess">Unauthorized Access</option>
                <option value="LowBattery">Low Battery</option>
                <option value="DataMismatch">Data Mismatch</option>
                <option value="SensorFailure">Sensor Failure</option>
            </select>
        </div>
    );
};

export default AlertFilter;
