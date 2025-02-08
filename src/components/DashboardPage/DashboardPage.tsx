import React from 'react';
import './DashboardPage.css'; // Stil dosyası importu

/**
 * DashboardPage, uygulamanızın ana paneli gibi
 * davranan basit bir bileşendir.
 */
const DashboardPage: React.FC = () => {
    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <p>Welcome to the Dashboard!</p>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h4>Total Users</h4>
                    <p>120</p>
                </div>
                <div className="stat-card">
                    <h4>Active Sessions</h4>
                    <p>15</p>
                </div>
                <div className="stat-card">
                    <h4>Pending Tasks</h4>
                    <p>8</p>
                </div>
            </div>

            <div className="dashboard-content">
                <p>
                    Here you can monitor key metrics, navigate to different sections, and
                    manage system settings.
                </p>
            </div>
        </div>
    );
};

export default DashboardPage;
