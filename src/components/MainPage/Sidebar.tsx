import React from 'react';
import './Sidebar.css';

interface SidebarProps {
    activeLink: string;
    onLinkClick: (link: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeLink, onLinkClick }) => {
    const navLinks = [
        { key: 'realtime', label: 'Real-Time Pricing' },
        { key: 'inventory', label: 'Inventory' },
        { key: 'alerts', label: 'Alerts' },
        { key: 'analytics', label: 'Analytics' },
        { key: 'settings', label: 'Settings' },
        { key: 'help', label: 'Help' },
    ];

    return (
        <div className="sidebar-container">
            <div className="sidebar-logo">My Dashboard</div>
            <ul className="sidebar-nav">
                {navLinks.map((item) => (
                    <li
                        key={item.key}
                        className={`nav-item ${activeLink === item.key ? 'active' : ''}`}
                        onClick={() => onLinkClick(item.key)}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
