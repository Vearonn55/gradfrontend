import React from 'react';
import { AlertItem } from './types';

interface AlertListProps {
    alerts: AlertItem[];
    filterType: string;
}

const AlertList: React.FC<AlertListProps> = ({ alerts, filterType }) => {
    const filteredAlerts = filterType === 'All'
        ? alerts
        : alerts.filter(alert => alert.AlertType === filterType);

    return (
        <div>
            <ul>
                {filteredAlerts.map(alert => (
                    <li key={alert.AlertID}>
                        <strong>{alert.AlertType}</strong> — Product ID: {alert.ProductID} — {new Date(alert.AlertDateTime).toLocaleDateString()} — Status: {alert.Status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlertList;
