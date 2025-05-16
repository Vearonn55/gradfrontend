// src/components/MainPage/MainLayout.tsx
import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardPage from "../DashboardPage/DashboardPage";
import PriceManagementPage from "../PriceManagementPage/PriceManagementPage";
import ReportsAndAnalyticsPage from "../ReportsAndAnalyticsPage/ReportsAndAnalyticsPage";
import AlertsManagementPage from "../AlertsManagement/AlertsManagementPage";
import UserManagementPage from "../UserManagementPage/UserManagementPage";
import SettingsPage from "../SettingsPage/SettingsPage";
import HelpCenterPage from "../HelpCenterPage/HelpCenterPage";
import InventoryPage from "../InventoryMonitoringPage/InventoryPage";
import SalesPage from "../SalesPage/SalesPage";  // ← Yeni SalesPage import

const MainLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState(location.pathname);

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
        navigate(link);
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar stays fixed */}
            <Sidebar activeLink={activeLink} onLinkClick={handleLinkClick} />

            {/* Main content area */}
            <div style={{ flex: 1, padding: 20, overflowY: "auto" }}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/prices" element={<PriceManagementPage />} />
                    <Route path="/reports" element={<ReportsAndAnalyticsPage />} />
                    <Route path="/alerts" element={<AlertsManagementPage />} />
                    <Route path="/users" element={<UserManagementPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/help" element={<HelpCenterPage />} />
                    <Route path="/inventory" element={<InventoryPage />} />
                    <Route path="/sales" element={<SalesPage />} />      {/* ← Sales route */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default MainLayout;
