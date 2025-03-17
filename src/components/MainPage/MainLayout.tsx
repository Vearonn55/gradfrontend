import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardPage from "../DashboardPage/DashboardPage";
import PriceManagementPage from "../PriceManagementPage/PriceManagementPage";
import ReportsAndAnalyticsPage from "../ReportsAndAnalyticsPage/ReportsAndAnalyticsPage";
import AlertsManagementPage from "../AlertsManagement/AlertsManagementPage";
import UserManagementPage from "../UserManagementPage/UserManagementPage";
import HelpCenterPage from "../HelpCenterPage/HelpCenterPage";
import InventoryPage from "../InventoryMonitoringPage/InventoryPage"; // Doğru sayfa!

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
            {/* Sidebar Sabit Kalıyor */}
            <Sidebar activeLink={activeLink} onLinkClick={handleLinkClick} />

            {/* İçerik Alanı */}
            <div style={{ flex: 1, padding: 20, overflowY: "auto" }}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/prices" element={<PriceManagementPage />} />
                    <Route path="/reports" element={<ReportsAndAnalyticsPage />} />
                    <Route path="/alerts" element={<AlertsManagementPage />} />
                    <Route path="/users" element={<UserManagementPage />} />
                    <Route path="/help" element={<HelpCenterPage />} />
                    <Route path="/inventory" element={<InventoryPage />} /> {/* DÜZELTİLDİ */}
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </div>
        </div>
    );
};

export default MainLayout;
