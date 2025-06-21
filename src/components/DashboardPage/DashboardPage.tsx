import React from "react";
import "./DashboardPage.css";
import { API_BASE_URL } from '../../config';

const DashboardPage: React.FC = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="dashboard-header-text">
                    <h1 className="dashboard-title">Electronic Smart Labeling System</h1>
                    <p className="dashboard-subtitle">Etiketleme Sistemi Genel Bakış</p>
                </div>
            </div>

            <div className="dashboard-cards">
                <div className="card">
                    <h2>Toplam Etiket Sayısı</h2>
                    <p className="count">542</p>
                </div>
                <div className="card">
                    <h2>Aktif Etiketler</h2>
                    <p className="count">489</p>
                </div>
                <div className="card">
                    <h2>Uyarılar</h2>
                    <p className="count warning">12</p>
                </div>
            </div>

            <div className="dashboard-charts">
                <div className="chart">
                    <h3>Etiket Kullanım İstatistikleri</h3>
                    <div className="chart-placeholder">Grafik Alanı</div>
                </div>
                <div className="chart">
                    <h3>Etiket Durum Dağılımı</h3>
                    <div className="chart-placeholder">Grafik Alanı</div>
                </div>
            </div>

            <div className="dashboard-alerts">
                <h3>Son Uyarılar</h3>
                <ul>
                    <li>Etiket #123: Pil seviyesi düşük</li>
                    <li>Etiket #456: Bağlantı sorunu</li>
                    <li>Etiket #789: Sıcaklık anormal</li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardPage;
