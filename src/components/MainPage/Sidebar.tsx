// src/components/MainPage/Sidebar.tsx
import React from "react";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps {
    activeLink: string;
    onLinkClick: (link: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeLink, onLinkClick }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems: { name: string; path: string }[] = [
        { name: "Real-Time Pricing", path: "/prices" },
        { name: "Inventory Management", path: "/inventory" },
        { name: "Alerts", path: "/alerts" },
        { name: "Analytics", path: "/reports" },
        { name: "Settings", path: "/settings" },
        { name: "Help", path: "/help" }
    ];

    return (
        <div className="sidebar">
            {/* Logout Butonu En Üste Alındı */}
            <Button
                className="logout-button"
                onClick={() => navigate("/login")}
                variant="contained"
                color="error"
            >
                Logout
            </Button>

            <ul className="sidebar-menu">
                {/* Dashboard Butonu (MainPage Dışında Görünecek) */}
                {location.pathname !== "/dashboard" && (
                    <li>
                        <button
                            className="dashboard-button"
                            onClick={() => navigate("/dashboard")}
                        >
                            Dashboard
                        </button>
                    </li>
                )}

                {/* Diğer Sayfa Butonları */}
                {menuItems.map((item) => (
                    <li key={item.name}>
                        <button
                            className={activeLink === item.path ? "active" : ""}
                            onClick={() => {
                                onLinkClick(item.path);
                                navigate(item.path);
                            }}
                        >
                            {item.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;