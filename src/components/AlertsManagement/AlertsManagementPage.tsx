import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlertFilter from './AlertFilter';
import AlertList from './AlertList';
import HistoricalLog from './HistoricalLog';
import './AlertsManagementPage.css';
import { AlertItem } from './types';

const AlertsManagementPage: React.FC = () => {
    const [alerts, setAlerts] = useState<AlertItem[]>([]);
    const [filterType, setFilterType] = useState<string>('All');
    const [newAlertData, setNewAlertData] = useState({
        productId: '',
        alertType: 'PriceExceeded',
    });

    useEffect(() => {
        axios.get('/api/alerts')
            .then(res => {
                const transformed = res.data.map((alert: any) => ({
                    id: alert.AlertID,
                    type: alert.AlertType,
                    message: `Alert for Product ID ${alert.ProductID}`,
                    date: new Date(alert.AlertDateTime).toLocaleDateString(),
                    resolved: alert.Status === 'Resolved'
                }));
                setAlerts(transformed);
            })
            .catch(err => console.error('Error fetching alerts:', err));
    }, []);

    const handleCreateAlert = async () => {
        try {
            const res = await axios.post('/api/alerts', {
                ProductID: Number(newAlertData.productId),
                AlertType: newAlertData.alertType,
                Status: 'Pending'
            });
            const newAlert = res.data.alert;
            setAlerts(prev => [
                ...prev,
                {
                    id: newAlert.AlertID,
                    type: newAlert.AlertType,
                    message: `Alert for Product ID ${newAlert.ProductID}`,
                    date: new Date(newAlert.AlertDateTime).toLocaleDateString(),
                    resolved: newAlert.Status === 'Resolved'
                }
            ]);
            setNewAlertData({ productId: '', alertType: 'PriceExceeded' });
        } catch (error) {
            console.error('Error creating alert:', error);
        }
    };

    const activeAlerts = alerts.filter(alert =>
        !alert.resolved && (filterType === 'All' || alert.type === filterType)
    );

    return (
        <div className="alerts-management-container">
            <h1>Alerts Management</h1>

            <div className="create-alert">
                <input
                    type="number"
                    placeholder="Product ID"
                    value={newAlertData.productId}
                    onChange={e => setNewAlertData({ ...newAlertData, productId: e.target.value })}
                />
                <select
                    value={newAlertData.alertType}
                    onChange={e => setNewAlertData({ ...newAlertData, alertType: e.target.value })}
                >
                    <option value="PriceExceeded">Price Exceeded</option>
                    <option value="NearExpiry">Near Expiry</option>
                </select>
                <button onClick={handleCreateAlert}>Create Alert</button>
            </div>

            <AlertFilter selectedType={filterType} onTypeChange={setFilterType} />
            <AlertList alerts={activeAlerts} setAlerts={setAlerts} />
            <HistoricalLog alerts={alerts.filter(alert => alert.resolved)} />
        </div>
    );
};

export default AlertsManagementPage;
