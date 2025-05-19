/* src/components/ReportsAndAnalyticsPage/ReportsAndAnalyticsPage.tsx */
import React, { useState } from 'react';
import DateRangePicker from './DateRangePicker';
import PriceHistoryChart from './PriceHistoryChart';
import SalesTrendsChart from './SalesTrendsChart';
import DownloadReportButton from './DownloadReportButton';
import './ReportsAndAnalyticsPage.css';
interface PriceHistoryData {
    date: string;
    price: number;
}
interface SalesData {
    date: string;
    sales: number;
}

const ReportsAndAnalyticsPage: React.FC = () => {
    const [startDate, setStartDate] = useState<string>('2025-05-01');
    const [endDate, setEndDate] = useState<string>('2025-05-07');

    // Örnek veri; gerçek uygulamada API ile çekilir ve date aralığına göre filtrelenir
    const allPriceHistory: PriceHistoryData[] = [
        { date: '2025-05-01', price: 100 },
        { date: '2025-05-02', price: 120 },
        { date: '2025-05-03', price: 90 },
        { date: '2025-05-04', price: 110 },
        { date: '2025-05-05', price: 130 },
        { date: '2025-05-06', price: 125 },
        { date: '2025-05-07', price: 140 },
    ];
    const allSales: SalesData[] = [
        { date: '2025-05-01', sales: 5 },
        { date: '2025-05-02', sales: 8 },
        { date: '2025-05-03', sales: 3 },
        { date: '2025-05-04', sales: 7 },
        { date: '2025-05-05', sales: 6 },
        { date: '2025-05-06', sales: 9 },
        { date: '2025-05-07', sales: 4 },
    ];

    // Tarih filtresi uygulama
    const filteredPriceHistory = allPriceHistory.filter(d => d.date >= startDate && d.date <= endDate);
    const filteredSales = allSales.filter(d => d.date >= startDate && d.date <= endDate);

    const handleDateChange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <div className="reports-container">
            <h1>Reports & Analytics</h1>
            <div className="date-picker-wrapper">
                <DateRangePicker onDateChange={handleDateChange} />
            </div>
            <div className="charts-grid">
                <div className="chart-card">
                    <PriceHistoryChart data={filteredPriceHistory} />
                    <DownloadReportButton reportName="PriceHistory" data={filteredPriceHistory} />
                </div>
                <div className="chart-card">
                    <SalesTrendsChart data={filteredSales} />
                    <DownloadReportButton reportName="SalesTrends" data={filteredSales} />
                </div>
            </div>
        </div>
    );
};

export default ReportsAndAnalyticsPage;