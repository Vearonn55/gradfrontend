import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps {
    activeLink: string;
    onLinkClick: (link: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeLink, onLinkClick }) => {
    const navigate = useNavigate();

    const menuItems: { name: string; path: string }[] = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Sale", path: "/sales" },
        { name: "Sale Reports", path: "/sale-reports" },
        { name: "Update Price", path: "/prices" },
        { name: "Add Product", path: "/add-product" },
        { name: "Inventory List", path: "/inventory" },
        { name: "Label Configure", path: "/label-configure" }, // ✅ Yeni eklendi
        { name: "Alerts", path: "/alerts" },
        { name: "Analytics", path: "/reports" },
        { name: "Settings", path: "/settings" },
        { name: "Help", path: "/help" }
    ];

    return (
        <div className="sidebar">
            <div
                className="sidebar-header"
                onClick={() => {
                    onLinkClick("/dashboard");
                    navigate("/dashboard");
                }}
            >
                Electronic Smart Labeling System
            </div>

            <ul className="sidebar-menu">
                {menuItems.map(item => (
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

                <li className="logout-wrapper">
                    <Button
                        className="logout-button-inline"
                        onClick={() => navigate("/login")}
                        variant="contained"
                        color="error"
                        fullWidth
                    >
                        Logout
                    </Button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
