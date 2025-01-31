import React, { useState } from 'react';
import './TopBar.css';

interface TopBarProps {
    onSearch: (searchTerm: string) => void;
    onLogout: () => void;
    onSettings: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSearch, onLogout, onSettings }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isProfileOpen, setProfileOpen] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const toggleProfileMenu = () => {
        setProfileOpen(!isProfileOpen);
    };

    return (
        <div className="topbar-container">
            <form className="search-bar" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
            </form>

            <div className="topbar-right">
                <div className="notifications-bell">
                    <span>🔔</span> {/* Basit bir emoji simgesi; yerine bir ikon da gelebilir */}
                </div>
                <div className="profile-section">
                    <div className="profile-avatar" onClick={toggleProfileMenu}>
                        {/* Basit bir avatar örneği */}
                        <img src="https://via.placeholder.com/32" alt="User" />
                    </div>
                    {isProfileOpen && (
                        <div className="profile-dropdown">
                            <div className="profile-item" onClick={onSettings}>
                                Settings
                            </div>
                            <div className="profile-item" onClick={onLogout}>
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopBar;
