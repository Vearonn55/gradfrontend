import React, { useState } from 'react';
import AlertFilter from './AlertFilter';
import AlertList from './AlertList';
import HistoricalLog from './HistoricalLog';
import './AlertsManagementPage.css';

// Alert tipi tanımı
export interface AlertItem {
    id: number;
    type: 'PriceThresholdExceeded' | 'NearExpiry';
    message: string;
    date: string;
    resolved: boolean;
}

// Örnek başlangıç verisi
const initialAlerts: AlertItem[] = [
    { id: 1, type: 'PriceThresholdExceeded', message: 'Ürün #123 fiyat eşiğini aştı', date: '2025-05-06', resolved: false },
    { id: 2, type: 'NearExpiry', message: 'Ürün #456 son kullanma tarihine yakın', date: '2025-05-07', resolved: false },
    { id: 3, type: 'PriceThresholdExceeded', message: 'Ürün #789 fiyat eşiğini aştı', date: '2025-05-05', resolved: true },
];

const AlertsManagementPage: React.FC = () => {
    const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
    const [filterType, setFilterType] = useState<string>('All');

    const handleTypeChange = (type: string) => setFilterType(type);
    const handleResolveAlert = (id: number) => {
        setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
    };

    const activeAlerts = alerts.filter(a => !a.resolved && (filterType === 'All' || a.type === filterType));

    return (
        <div className="page-container">
            <h1>Alerts Management</h1>
            <div className="alerts-filter-section">
                <AlertFilter selectedType={filterType} onTypeChange={handleTypeChange} />
            </div>
            <div className="alerts-content">
                <section className="active-alerts-section">
                    <h3>Active Alerts</h3>
                    <AlertList alerts={activeAlerts} onResolveAlert={handleResolveAlert} />
                </section>
                <section className="historical-log-section">
                    <h3>Historical Log (Resolved Alerts)</h3>
                    <HistoricalLog alerts={alerts} />
                </section>
            </div>
        </div>
    );
};

export default AlertsManagementPage;