import React from "react";
import "./DashboardPage.css";
import { API_BASE_URL } from '../../config';

const DashboardPage: React.FC = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="dashboard-header-text">
                    <h1 className="dashboard-title">Electronic Smart Labeling System</h1>
                    <p className="dashboard-subtitle">Overall Labeling Status</p>
                </div>
            </div>

            <div className="dashboard-cards">
                <div className="card">
                    <h2>Active Labels</h2>
                    <p className="count">1</p>
                </div>
                <div className="card">
                    <h2>Active Alerts</h2>
                    <p className="count">5</p>
                </div>
                <div className="card">
                    <h2>Resolved Alerts</h2>
                    <p className="count warning">3</p>
                </div>
            </div>

            <div className="alerts-section">
                <div className="alerts-box">
                    <h3>Active Alerts</h3>
                    <ul>
                        <li>Product ID: 4 Price Exceeded 16/06/2025</li>
                        <li>Product ID: 5 Price Exceeded 16/06/2025</li>
                        <li>Product ID: 5 Price Exceeded 17/06/2025</li>
                        <li>Product ID: 2 Price Exceeded 19/06/2025</li>
                        <li>Product ID: 6 Near Expiry 27/06/2025</li>
                    </ul>
                </div>
                <div className="alerts-box">
                    <h3>Resolved Alerts</h3>
                    <ul>
                        <li>Product ID: 3 Price Exceeded 10/04/2025</li>
                        <li>Product ID: 4 Price Exceeded 27/06/2025</li>
                        <li>Product ID: 6 Price Exceeded 27/06/2025</li>
                    </ul>
                </div>
            </div>

            <div className="sales-history-box">
                <h3>Latest Sales</h3>
                <table className="sales-history-table">
                    <thead>
                        <tr>
                            <th>Sale #</th>
                            <th>Product ID</th>
                            <th>Quantity</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>15</td><td>4</td><td>9</td><td>12/24/2025, 1:10:00 PM</td></tr>
                        <tr><td>14</td><td>4</td><td>14</td><td>11/17/2025, 7:30:00 PM</td></tr>
                        <tr><td>13</td><td>4</td><td>10</td><td>10/29/2025, 10:00:00 AM</td></tr>
                        <tr><td>12</td><td>4</td><td>22</td><td>9/9/2025, 6:00:00 PM</td></tr>
                        <tr><td>11</td><td>4</td><td>18</td><td>8/14/2025, 4:35:00 PM</td></tr>
                        <tr><td>10</td><td>4</td><td>30</td><td>7/5/2025, 9:10:00 PM</td></tr>
                        <tr><td>35</td><td>5</td><td>40</td><td>6/27/2025, 1:53:31 AM</td></tr>
                        <tr><td>32</td><td>6</td><td>1</td><td>6/19/2025, 6:16:24 PM</td></tr>
                        <tr><td>9</td><td>4</td><td>25</td><td>6/18/2025, 3:20:00 PM</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardPage;
