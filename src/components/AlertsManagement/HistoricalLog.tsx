import React from 'react';
import { AlertItem } from './types'; // Import yolu projenize göre değişebilir
import './HistoricalLog.css';

interface HistoricalLogProps {
    alerts: AlertItem[];
}

const HistoricalLog: React.FC<HistoricalLogProps> = ({ alerts }) => {
    // Sadece resolved olanları gösterelim
    const resolvedAlerts = alerts.filter((alert) => alert.resolved);

    if (resolvedAlerts.length === 0) {
        return (
            <div className="historical-log-container">
                <h3>Historical Log (Resolved Alerts)</h3>
                <p>No resolved alerts yet.</p>
            </div>
        );
    }

    return (
        <div className="historical-log-container">
            <h3>Historical Log (Resolved Alerts)</h3>
            <table>
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
