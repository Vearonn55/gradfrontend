import React from 'react';
import { AlertItem } from './AlertsManagementPage'; // Doğru import yolunu kullanıyorum

interface HistoricalLogProps {
    alerts: AlertItem[];
}

const HistoricalLog: React.FC<HistoricalLogProps> = ({ alerts }) => {
    // Sadece resolved olanları gösterelim
    const resolvedAlerts = alerts.filter((alert) => alert.resolved);

    if (resolvedAlerts.length === 0) {
        return (
            <div className="historical-log-container">
                <p>No resolved alerts yet.</p>
            </div>
        );
    }

    return (
        <div className="historical-log-container"> 
            <table className="data-table">
                <thead>
                <tr>
                    <th>Type</th>
                    <th>Message</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {resolvedAlerts.map((alert) => (
                    <tr key={alert.id}>
                        <td>{alert.type}</td>
                        <td>{alert.message}</td>
                        <td>{alert.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoricalLog;
