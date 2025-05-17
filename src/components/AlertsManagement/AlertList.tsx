import React from 'react';
import { AlertItem } from './AlertsManagementPage'; // Doğru import yolunu kullanıyorum

interface AlertListProps {
    alerts: AlertItem[];
    onResolveAlert: (id: number) => void;
}

const AlertList: React.FC<AlertListProps> = ({ alerts, onResolveAlert }) => {
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
                            <button onClick={() => onResolveAlert(alert.id)}>Resolve</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlertList;
