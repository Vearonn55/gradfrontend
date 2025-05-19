import React, { useState, useEffect } from 'react';
import AlertFilter from './AlertFilter';
import AlertList from './AlertList';
import HistoricalLog from './HistoricalLog';
import './AlertsManagementPage.css';

export interface AlertItem {
    id: number;
    type:
        | 'PriceThresholdExceeded'
        | 'NearExpiry'
        | 'OutOfStock'
        | 'HighDemand'
        | 'StorageTemperatureIssue'
        | 'ShipmentDelay'
        | 'UnauthorizedAccess'
        | 'LowBattery'
        | 'DataMismatch'
        | 'SensorFailure';
    message: string;
    date: string;
    resolved: boolean;
}

const defaultAlerts: AlertItem[] = [
    {
        id: 1,
        type: 'PriceThresholdExceeded',
        message: 'Ürün #123 fiyat eşiğini aştı',
        date: '2025-05-06',
        resolved: false
    },
    {
        id: 2,
        type: 'NearExpiry',
        message: 'Ürün #456 son kullanma tarihine yakın',
        date: '2025-05-07',
        resolved: false
    },
    {
        id: 3,
        type: 'OutOfStock',
        message: 'Ürün #789 stoğu tükendi',
        date: '2025-05-08',
        resolved: true
    }
];

const AlertsManagementPage: React.FC = () => {
    const [alerts, setAlerts] = useState<AlertItem[]>(() => {
        const stored = localStorage.getItem('alerts');
        return stored ? JSON.parse(stored) : defaultAlerts;
    });

    const [filterType, setFilterType] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [newAlert, setNewAlert] = useState({
        id: '',
        type: 'PriceThresholdExceeded',
        message: '',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        localStorage.setItem('alerts', JSON.stringify(alerts));
    }, [alerts]);

    const handleTypeChange = (type: string) => setFilterType(type);

    const handleResolveAlert = (id: number) => {
        setAlerts(prev => prev.map(a => (a.id === id ? { ...a, resolved: true } : a)));
    };

    const handleNewAlertSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newItem: AlertItem = {
            id: parseInt(newAlert.id),
            type: newAlert.type as AlertItem['type'],
            message: newAlert.message,
            date: newAlert.date,
            resolved: false
        };
        setAlerts(prev => [...prev, newItem]);
        setNewAlert({
            id: '',
            type: 'PriceThresholdExceeded',
            message: '',
            date: new Date().toISOString().split('T')[0]
        });
        setFilterType('All'); // Yeni alert eklendiğinde tümünü göster
    };

    const filteredAlerts = alerts.filter(alert => {
        const matchesType = filterType === 'All' || alert.type === filterType;
        const matchesQuery =
            alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
            alert.id.toString().includes(searchQuery);
        const matchesStart = startDate ? alert.date >= startDate : true;
        const matchesEnd = endDate ? alert.date <= endDate : true;
        return !alert.resolved && matchesType && matchesQuery && matchesStart && matchesEnd;
    });

    const exportCSV = () => {
        const header = 'ID,Type,Message,Date,Resolved\n';
        const rows = alerts
            .map(a => `${a.id},${a.type},${a.message},${a.date},${a.resolved}`)
            .join('\n');
        const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'alerts.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportPDF = () => {
        alert('PDF export not yet implemented. You can integrate jsPDF.');
    };

    return (
        <div className="page-container">
            <h1>Alerts Management</h1>

            <div className="alerts-filter-section">
                <AlertFilter selectedType={filterType} onTypeChange={handleTypeChange} />
                <input
                    type="text"
                    className="form-input search-input"
                    placeholder="Search by ID or message..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <input
                    type="date"
                    className="form-input"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    className="form-input"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                />
                <button className="export-btn" onClick={exportCSV}>
                    Export CSV
                </button>
                <button className="export-btn" onClick={exportPDF}>
                    Export PDF
                </button>
            </div>

            <form className="new-alert-form" onSubmit={handleNewAlertSubmit}>
                <div className="form-label">Create Alert</div>
                <input
                    type="number"
                    name="id"
                    placeholder="Product ID"
                    className="form-input"
                    required
                    value={newAlert.id}
                    onChange={e => setNewAlert(prev => ({ ...prev, id: e.target.value }))}
                />
                <select
                    name="type"
                    className="form-input"
                    value={newAlert.type}
                    onChange={e => setNewAlert(prev => ({ ...prev, type: e.target.value }))}
                >
                    <option value="PriceThresholdExceeded">Price Threshold Exceeded</option>
                    <option value="NearExpiry">Near Expiry</option>
                    <option value="OutOfStock">Out of Stock</option>
                    <option value="HighDemand">High Demand</option>
                    <option value="StorageTemperatureIssue">Storage Temperature Issue</option>
                    <option value="ShipmentDelay">Shipment Delay</option>
                    <option value="UnauthorizedAccess">Unauthorized Access</option>
                    <option value="LowBattery">Low Battery</option>
                    <option value="DataMismatch">Data Mismatch</option>
                    <option value="SensorFailure">Sensor Failure</option>
                </select>
                <input
                    type="text"
                    name="message"
                    placeholder="Alert message"
                    className="form-input"
                    required
                    value={newAlert.message}
                    onChange={e => setNewAlert(prev => ({ ...prev, message: e.target.value }))}
                />
                <input
                    type="date"
                    name="date"
                    className="form-input"
                    value={newAlert.date}
                    onChange={e => setNewAlert(prev => ({ ...prev, date: e.target.value }))}
                    required
                />
                <button type="submit" className="resolve-btn">
                    Add Alert
                </button>
            </form>

            <div className="alerts-content">
                <section className="active-alerts-section">
                    <h3>Active Alerts</h3>
                    <AlertList alerts={filteredAlerts} onResolveAlert={handleResolveAlert} />
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
