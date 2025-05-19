import React from 'react';
import { AlertItem } from './AlertsManagementPage';

interface HistoricalLogProps {
    alerts: AlertItem[];
}

const formatAlertType = (type: string) => {
    return type
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
};

const HistoricalLog: React.FC<HistoricalLogProps> = ({ alerts }) => {
    const resolvedAlerts = alerts.filter((alert) => alert.resolved);

    if (resolvedAlerts.length === 0) {
        return <p className="empty-message">No resolved alerts yet.</p>;
    }

    return (
        <div className="historical-log-container">
            {resolvedAlerts.map((alert) => (
                <div key={alert.id} className="history-card">
                    <div className="alert-card-header">
                        <strong>{formatAlertType(alert.type)}</strong>
                        <span className="alert-date">({alert.date})</span>
                    </div>
                    <div className="alert-message">{alert.message}</div>
                </div>
            ))}
        </div>
    );
};

export default HistoricalLog;
