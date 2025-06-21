import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AlertsManagementPage.css';
import { AlertItem } from './types';
import { API_BASE_URL } from '../../config';

const token = localStorage.getItem("authToken");

const AlertsManagementPage: React.FC = () => {
    const [alerts, setAlerts] = useState<AlertItem[]>([]);
    const [filterType, setFilterType] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [newAlertData, setNewAlertData] = useState({
        productId: '',
        alertType: 'PriceExceeded',
    });

    const fetchAlerts = () => {
        axios.get(`${API_BASE_URL}/api/alerts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => setAlerts(res.data))
            .catch(err => console.error("Failed to fetch alerts:", err));
    };

    const handleCreateAlert = async () => {
        try {
            if (!newAlertData.productId || isNaN(Number(newAlertData.productId))) {
                alert("Please enter a valid Product ID.");
                return;
            }
            await axios.post(`${API_BASE_URL}/api/alerts`, {
                ProductID: parseInt(newAlertData.productId),
                AlertType: newAlertData.alertType,
                Status: "Pending"
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            fetchAlerts();
            setNewAlertData({ productId: '', alertType: 'PriceExceeded' });
        } catch (err) {
            console.error("Error creating alert:", err);
        }
    };

    const handleResolveAlert = async (alertId: number) => {
        try {
            await axios.patch(`/api/alerts/${alertId}/resolve`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setAlerts(prev =>
                prev.map(alert =>
                    alert.AlertID === alertId ? { ...alert, Status: "Resolved" } : alert
                )
            );
        } catch (err) {
            console.error("Failed to resolve alert:", err);
        }
    };

    const handleExportCSV = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/alerts/export/csv`, {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'alerts.csv');
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.error("CSV download failed:", err);
            alert("You must be logged in to export.");
        }
    };

    const handleExportPDF = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/alerts/export/pdf`, {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'alerts.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.error("PDF download failed:", err);
            alert("You must be logged in to export.");
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    const filteredAlerts = alerts.filter(alert =>
        (filterType === 'All' || alert.AlertType === filterType) &&
        (searchTerm === '' ||
            alert.ProductID.toString().includes(searchTerm) ||
            alert.AlertType.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const activeAlerts = filteredAlerts.filter(a => a.Status === 'Pending');
    const resolvedAlerts = filteredAlerts.filter(a => a.Status === 'Resolved');

    return (
        <div className="page-container">
            <h2>Alerts Management</h2>

            <div className="search-filter-bar">
                <input
                    type="text"
                    placeholder="Search by Product ID or Type"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                <select
                    value={filterType}
                    onChange={e => setFilterType(e.target.value)}
                    className="form-input"
                >
                    <option value="All">All Alerts</option>
                    <option value="PriceExceeded">PriceExceeded</option>
                    <option value="NearExpiry">NearExpiry</option>
                </select>
            </div>

            <div className="top-bar">
                <input
                    type="number"
                    placeholder="Product ID"
                    value={newAlertData.productId}
                    onChange={e => setNewAlertData({ ...newAlertData, productId: e.target.value })}
                    className="form-input"
                />
                <select
                    value={newAlertData.alertType}
                    onChange={e => setNewAlertData({ ...newAlertData, alertType: e.target.value })}
                    className="form-input"
                >
                    <option value="PriceExceeded">PriceExceeded</option>
                    <option value="NearExpiry">NearExpiry</option>
                </select>
                <button onClick={handleCreateAlert} className="create-btn">Create Alert</button>
            </div>

            <div className="alerts-content">
                <div>
                    <h3>Active Alerts</h3>
                    {activeAlerts.map(alert => (
                        <div key={alert.AlertID} className="alert-card">
                            <div className="alert-card-header">
                                <strong>{alert.AlertType}</strong>
                                <span className="alert-date">({new Date(alert.AlertDateTime).toLocaleDateString()})</span>
                            </div>
                            <div className="alert-message">Product ID: {alert.ProductID}</div>
                            <button className="resolve-btn" onClick={() => handleResolveAlert(alert.AlertID)}>Resolve</button>
                        </div>
                    ))}
                    {activeAlerts.length === 0 && <p className="empty-message">No active alerts</p>}
                </div>

                <div>
                    <h3>Historical Log (Resolved Alerts)</h3>
                    {resolvedAlerts.map(alert => (
                        <div key={alert.AlertID} className="history-card">
                            <div className="alert-card-header">
                                <strong>{alert.AlertType}</strong>
                                <span className="alert-date">({new Date(alert.AlertDateTime).toLocaleDateString()})</span>
                            </div>
                            <div className="alert-message">Product ID: {alert.ProductID}</div>
                        </div>
                    ))}
                    {resolvedAlerts.length === 0 && <p className="empty-message">No resolved alerts</p>}
                </div>
            </div>

            <div className="export-buttons">
                <button onClick={handleExportCSV} className="export-btn">Export CSV</button>
                <button onClick={handleExportPDF} className="export-btn">Export PDF</button>
            </div>
        </div>
    );
};

export default AlertsManagementPage;
