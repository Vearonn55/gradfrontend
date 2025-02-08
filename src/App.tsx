// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Bileşenleri import edelim
import LoginPage from './components/LoginPage/LoginPage';
import DashboardPage from './components/DashboardPage/DashboardPage';
import PriceManagementPage from './components/PriceManagementPage/PriceManagementPage';
import InventoryMonitoringPage from './components/InventoryMonitoringPage/InventoryMonitoringPage';
import ReportsAndAnalyticsPage from './components/ReportsAndAnalyticsPage/ReportsAndAnalyticsPage';
import AlertsManagementPage from './components/AlertsManagement/AlertsManagementPage';
import UserManagementPage from './components/UserManagementPage/UserManagementPage';
import HelpCenterPage from './components/HelpCenterPage/HelpCenterPage';

// SearchBar'ı import edelim (dosya yolunu kendi projenizdeki konuma göre ayarlayın)
import SearchBar from './components/PriceManagementPage/SearchBar';

function App() {
    // Arama fonksiyonu örneği:
    const handleSearch = (query: string) => {
        console.log('Aranan ifade:', query);
        // İhtiyacınıza göre API çağrısı, filtreleme vb. yapabilirsiniz
    };

    return (
        <BrowserRouter>
            <div style={{ padding: 16 }}>
                <h2>React + TypeScript Project</h2>

                {/* Basit bir menü örneği */}
                <nav style={{ marginBottom: 16 }}>
                    <Link to="/" style={{ marginRight: 8 }}>Login</Link>
                    <Link to="/dashboard" style={{ marginRight: 8 }}>Dashboard</Link>
                    <Link to="/prices" style={{ marginRight: 8 }}>Price Mng</Link>
                    <Link to="/inventory" style={{ marginRight: 8 }}>Inventory</Link>
                    <Link to="/reports" style={{ marginRight: 8 }}>Reports</Link>
                    <Link to="/alerts" style={{ marginRight: 8 }}>Alerts</Link>
                    <Link to="/users" style={{ marginRight: 8 }}>Users</Link>
                    <Link to="/help" style={{ marginRight: 8 }}>Help</Link>
                </nav>

                {/* Buraya SearchBar ekliyoruz */}
                <SearchBar onSearch={handleSearch} />

                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/prices" element={<PriceManagementPage />} />
                    <Route path="/inventory" element={<InventoryMonitoringPage />} />
                    <Route path="/reports" element={<ReportsAndAnalyticsPage />} />
                    <Route path="/alerts" element={<AlertsManagementPage />} />
                    <Route path="/users" element={<UserManagementPage />} />
                    <Route path="/help" element={<HelpCenterPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
