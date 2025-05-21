import React from 'react';
import { AlertItem } from './types';

interface AlertListProps {
    alerts: AlertItem[];
    setAlerts: React.Dispatch<React.SetStateAction<AlertItem[]>>;
}

const AlertList: React.FC<AlertListProps> = ({ alerts, setAlerts }) => {
    const handleResolve = async (alertId: number) => {
        try {
            const res = await fetch(`/api/alerts/${alertId}/resolve`, {
                method: 'PATCH'
            });

            if (res.ok) {
                setAlerts(prev =>
                    prev.map(alert =>
                        alert.id === alertId ? { ...alert, resolved: true } : alert
                    )
                );
            }
        } catch (err) {
            console.error('Failed to resolve alert:', err);
        }
    };

    return (
        <div className="alert-list-container">
            <ul>
                {alerts.map((alert) => (
                    <li key={alert.id} className={alert.resolved ? 'resolved' : ''}>
                        <div className="alert-content">
                            <div className="alert-type">{alert.type}</div>
                            <div className="alert-message">{alert.message}</div>
                            <div className="alert-date">({alert.date})</div>
                        </div>

                        {alert.resolved ? (
                            <span className="resolved-badge">Resolved</span>
                        ) : (
                            <button onClick={() => handleResolve(alert.id)}>Resolve</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlertList;
