import React from 'react';
import { AlertItem } from './types';

interface HistoricalLogProps {
    alerts: AlertItem[];
}

const formatAlertType = (type: string) => {
    switch (type) {
        case 'PriceExceeded':
            return 'Price Threshold Exceeded';
        case 'NearExpiry':
            return 'Near Expiry';
        default:
            return type;
    }
};

const HistoricalLog: React.FC<HistoricalLogProps> = ({ alerts }) => {
    const resolvedAlerts = alerts.filter((alert) => alert.Status === 'Resolved');

    if (resolvedAlerts.length === 0) {
        return <p className="empty-message">No resolved alerts yet.</p>;
    }

    return (
        <div className="historical-log-container">
            {resolvedAlerts.map((alert) => (
                <div key={alert.AlertID} className="history-card">
                    <div className="alert-card-header">
                        <strong>{formatAlertType(alert.AlertType)}</strong>
                        <span className="alert-date">({new Date(alert.AlertDateTime).toLocaleDateString()})</span>
                    </div>
                    <div className="alert-message">Product ID {alert.ProductID}</div>
                </div>
            ))}
        </div>
    );
};

export default HistoricalLog;
