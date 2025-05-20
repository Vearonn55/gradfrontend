// src/components/ReportsAndAnalyticsPage/ReportsAndAnalyticsPage.tsx
import React, { useState } from 'react';
import DateRangePicker from './DateRangePicker';
import PriceHistoryChart from './PriceHistoryChart';
import SalesTrendsChart from './SalesTrendsChart';
import DownloadReportButton from './DownloadReportButton';
import { useProducts } from '../context/ProductContext';
import './ReportsAndAnalyticsPage.css';

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
    const [startDate, setStartDate] = useState<string>('2025-05-01');
    const [endDate, setEndDate] = useState<string>('2025-05-07');
    const { products } = useProducts();
    const [productIdInput, setProductIdInput] = useState<string>('');

    const selectedProducts = productIdInput
        .split(',')
        .map(id => parseInt(id.trim()))
        .filter(id => !isNaN(id));

    const allPriceHistory: PriceHistoryData[] = products.flatMap(product => [
        { date: '2025-05-01', price: product.price, product: product.name, stock: product.stockQuantity },
        { date: '2025-05-02', price: product.price * 1.1, product: product.name, stock: product.stockQuantity },
        { date: '2025-05-03', price: product.price * 0.9, product: product.name, stock: product.stockQuantity },
        { date: '2025-05-04', price: product.price * 1.05, product: product.name, stock: product.stockQuantity },
        { date: '2025-05-05', price: product.price * 1.15, product: product.name, stock: product.stockQuantity },
        { date: '2025-05-06', price: product.price * 1.1, product: product.name, stock: product.stockQuantity },
        { date: '2025-05-07', price: product.price * 1.2, product: product.name, stock: product.stockQuantity },
    ]);

    const allSales: SalesData[] = products.flatMap(product => [
        { date: '2025-05-01', sales: Math.floor(product.stockQuantity * 0.1), product: product.name, stock: product.stockQuantity },
        { date: '2025-05-02', sales: Math.floor(product.stockQuantity * 0.15), product: product.name, stock: product.stockQuantity },
        { date: '2025-05-03', sales: Math.floor(product.stockQuantity * 0.08), product: product.name, stock: product.stockQuantity },
        { date: '2025-05-04', sales: Math.floor(product.stockQuantity * 0.12), product: product.name, stock: product.stockQuantity },
        { date: '2025-05-05', sales: Math.floor(product.stockQuantity * 0.1), product: product.name, stock: product.stockQuantity },
        { date: '2025-05-06', sales: Math.floor(product.stockQuantity * 0.18), product: product.name, stock: product.stockQuantity },
        { date: '2025-05-07', sales: Math.floor(product.stockQuantity * 0.09), product: product.name, stock: product.stockQuantity },
    ]);

    const handleDateChange = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
    };

    const filteredPriceHistory = allPriceHistory.filter(d => {
        const prod = products.find(p => p.name === d.product);
        return (
            d.date >= startDate &&
            d.date <= endDate &&
            (selectedProducts.length === 0 || (prod && selectedProducts.includes(prod.id)))
        );
    });

    const filteredSales = allSales.filter(d => {
        const prod = products.find(p => p.name === d.product);
        return (
            d.date >= startDate &&
            d.date <= endDate &&
            (selectedProducts.length === 0 || (prod && selectedProducts.includes(prod.id)))
        );
    });

    return (
        <div className="reports-container">
            <h1>Reports & Analytics</h1>
            <div className="filters-container">
                <div className="date-picker-wrapper">
                    <DateRangePicker onDateChange={handleDateChange} />
                </div>
                <div className="product-selector">
                    <label htmlFor="productIdInput">Enter Product ID(s):</label>
                    <input
                        type="text"
                        id="productIdInput"
                        value={productIdInput}
                        onChange={e => setProductIdInput(e.target.value)}
                        placeholder="e.g. 12 or 12,15,20"
                        className="product-id-input"
                    />
                </div>
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
