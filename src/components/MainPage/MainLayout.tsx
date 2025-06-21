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
import SalesPage from "../SalesPage/SalesPage";
import AddProductPage from "../AddProduct/AddProductPage";
import SaleReports from "../SaleReports/SaleReports";
import LabelConfigure from "../LabelConfigure/LabelConfigure"; // ✅ Yeni route
import { API_BASE_URL } from '../../config';

import "./MainLayout.css";

const MainLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState(location.pathname);

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
        navigate(link);
    };

    return (
        <div className="main-layout">
            <div className="sidebar-container">
                <Sidebar activeLink={activeLink} onLinkClick={handleLinkClick} />
            </div>

            <div className="content-container">
                <Routes location={location} key={location.pathname}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/prices" element={<PriceManagementPage />} />
                    <Route path="/reports" element={<ReportsAndAnalyticsPage />} />
                    <Route path="/alerts" element={<AlertsManagementPage />} />
                    <Route path="/users" element={<UserManagementPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/help" element={<HelpCenterPage />} />
                    <Route path="/inventory" element={<InventoryPage />} />
                    <Route path="/sales" element={<SalesPage />} />
                    <Route path="/add-product" element={<AddProductPage />} />
                    <Route path="/sale-reports" element={<SaleReports />} />
                    <Route path="/label-configure" element={<LabelConfigure />} /> {/* ✅ Yeni route */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default MainLayout;
