import { API_BASE_URL } from '../../config';

import React, { useState, useEffect } from 'react';
import DateRangePicker from './DateRangePicker';
import PriceHistoryChart from './PriceHistoryChart';
import SalesTrendsChart from './SalesTrendsChart';
import DownloadReportButton from './DownloadReportButton';
import './ReportsAndAnalyticsPage.css';
import axios from 'axios';

interface PriceHistoryData {
    date: string;
    price: number;
    product: string;
    stock: number;
}

interface SalesData {
    date: string;
    sales: number;
    product: string;
    stock: number;
}

const ReportsAndAnalyticsPage: React.FC = () => {
    const [startDate, setStartDate] = useState<string>('2025-01-01');
    const [endDate, setEndDate] = useState<string>('2025-12-31');
    const [productIdInput, setProductIdInput] = useState<string>('');
    const [priceHistory, setPriceHistory] = useState<PriceHistoryData[]>([]);
    const [salesData, setSalesData] = useState<SalesData[]>([]);
    const [token, setToken] = useState<string | null>(null);

    const selectedProductIds = productIdInput
    .split(',')
    .map(id => parseInt(id.trim()))
    .filter(id => !isNaN(id));

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) setToken(savedToken);
    }, []);

        useEffect(() => {
            if (!token || selectedProductIds.length === 0) return;

            const fetchAllData = async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.warn("⚠ No token found in localStorage.");
                    return;
                }
                const priceResult: PriceHistoryData[] = [];
                const salesResult: SalesData[] = [];

                for (const id of selectedProductIds) {
                    try {
                        const productRes = await axios.get(`http://localhost:5050/api/products/${id}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        const product = productRes.data;

                        const priceRes = await axios.get(
                            `http://localhost:5050/api/analytics/price-history/${id}?startDate=${startDate}&endDate=${endDate}`,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        priceRes.data.forEach((entry: any) => {
                            priceResult.push({
                                date: entry.date.split('T')[0],
                                price: parseFloat(product.Price), // ✅ fix: ensure number
                                             product: product.Name,
                                             stock: product.StockQuantity
                            });
                        });

                        const salesRes = await axios.get(
                            `http://localhost:5050/api/analytics/sales-trends/${id}?startDate=${startDate}&endDate=${endDate}`,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        salesRes.data.forEach((entry: any) => {
                            salesResult.push({
                                date: entry.date.split('T')[0],
                                sales: parseInt(entry.totalSold),
                                             product: product.Name,
                                             stock: product.StockQuantity
                            });
                        });
                    } catch (error) {
                        console.error(`Failed to fetch data for product ID ${id}`, error);
                    }
                }

                console.log("✅ Sales data pushed:", salesResult);
                console.log("✅ Price data pushed:", priceResult);
                setPriceHistory(priceResult);
                setSalesData(salesResult);
            };

            fetchAllData();
        }, [startDate, endDate, productIdInput, token]);

        return (
            <div className="reports-container">
            <h1>Reports and Analytics</h1>

            <div className="filters-container">
            <div className="date-picker-wrapper">
            <DateRangePicker
            onDateChange={(start, end) => {
                setStartDate(start);
                setEndDate(end);
            }}
            />
            </div>

            <div className="product-selector">
            <label htmlFor="productIdInput">Enter Product IDs:</label>
            <input
            id="productIdInput"
            type="text"
            placeholder="e.g. 1, 3, 5"
            className="product-id-input"
            value={productIdInput}
            onChange={(e) => setProductIdInput(e.target.value)}
            />
            </div>
            </div>

            <div className="charts-grid">
            <div className="chart-card">
            <PriceHistoryChart data={priceHistory} />
            <div className="download-report-button">
            <DownloadReportButton reportName="PriceHistory" data={priceHistory} />
            </div>
            </div>

            <div className="chart-card">
            <SalesTrendsChart data={salesData} />
            <div className="download-report-button">
            <DownloadReportButton reportName="SalesTrends" data={salesData} />
            </div>
            </div>
            </div>
            </div>
        );
};

export default ReportsAndAnalyticsPage;
