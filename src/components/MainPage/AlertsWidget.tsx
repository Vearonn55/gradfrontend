import React, { useState } from 'react';
import './AlertsWidget.css';

interface AlertItem {
    id: number;
    message: string;
    isResolved: boolean;
}

const initialAlerts: AlertItem[] = [
    { id: 1, message: 'Price sync delayed', isResolved: false },
    { id: 2, message: 'Inventory mismatch', isResolved: false },
    { id: 3, message: 'ESL offline', isResolved: true },
];

const AlertsWidget: React.FC = () => {
    const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);

    const handleResolve = (id: number) => {
        setAlerts((prev) =>
            prev.map((alert) => {
                if (alert.id === id) {
                    return { ...alert, isResolved: true };
                }
                return alert;
            })
        );
    };

    return (
        <div className="alerts-widget">
            <h3>Alerts</h3>
            <ul>
                {alerts.map((alert) => (
                    <li key={alert.id} className={alert.isResolved ? 'resolved' : ''}>
                        <span>{alert.message}</span>
                        {!alert.isResolved && (
                            <button onClick={() => handleResolve(alert.id)}>Resolve</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlertsWidget;
