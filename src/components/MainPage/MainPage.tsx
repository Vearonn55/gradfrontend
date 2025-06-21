import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./MainPage.css";
import { API_BASE_URL } from '../../config';

const MainPage: React.FC = () => {
    const [activeLink, setActiveLink] = useState("Real-Time Pricing");

    return (
        <div className="main-container">
            <Sidebar activeLink={activeLink} onLinkClick={setActiveLink} />
            <div className="content">
                <h1>Electronic Smart Labeling System</h1>
                <p>Dashboard</p>

                <div className="dashboard">
                    <div className="card">
                        <h3>Total Label</h3>
                        <span className="number blue">542</span>
                    </div>
                    <div className="card">
                        <h3>Active Labels</h3>
                        <span className="number blue">489</span>
                    </div>
                    <div className="card">
                        <h3>Warnings</h3>
                        <span className="number red">12</span>
                    </div>
                </div>

                <div className="charts">
                    <div className="chart">
                        <h3>Label Usage Statistics</h3>
                        <div className="chart-placeholder">Grafik Alanı</div>
                    </div>
                    <div className="chart">
                        <h3>Etiket Durum Dağılımı</h3>
                        <div className="chart-placeholder">Grafik Alanı</div>
                    </div>
                </div>

                <div className="alerts">
                    <h3>Son Uyarılar</h3>
                    <div className="alert-list">
                        <span className="alert">Etiket #123: Pil seviyesi düşük</span>
                        <span className="alert">Etiket #456: Bağlantı sorunu</span>
                        <span className="alert">Etiket #789: Sıcaklık anormal</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
