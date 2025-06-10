import React from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from 'recharts';

export interface SalesData {
    date: string;
    sales: number;
    product: string;
    stock: number;
}

interface SalesTrendsChartProps {
    data: SalesData[];
}

const SalesTrendsChart: React.FC<SalesTrendsChartProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return <p style={{ textAlign: 'center' }}>No sales trend data available.</p>;
    }

    const groupedData = data.reduce((acc: any[], curr) => {
        const existing = acc.find(item => item.date === curr.date);
        if (existing) {
            existing[`${curr.product} Sales`] = curr.sales;
            existing[`${curr.product} Stock`] = curr.stock;
        } else {
            acc.push({
                date: curr.date,
                [`${curr.product} Sales`]: curr.sales,
                [`${curr.product} Stock`]: curr.stock
            });
        }
        return acc;
    }, []);

    const productNames = Array.from(new Set(data.map(item => item.product)));

    return (
        <div className="sales-trends-container">
        <h3>Sales and Stock Trends by Product</h3>
        <ResponsiveContainer width="100%" height={300}>
        <LineChart data={groupedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        {productNames.map((product, index) => (
            <React.Fragment key={product}>
            <Line
            yAxisId="left"
            type="monotone"
            dataKey={`${product} Sales`}
            stroke={`hsl(${index * 60}, 70%, 50%)`}
            strokeWidth={2}
            name={`${product} Sales`}
            />
            <Line
            yAxisId="right"
            type="monotone"
            dataKey={`${product} Stock`}
            stroke={`hsl(${index * 60}, 70%, 75%)`}
            strokeDasharray="5 5"
            name={`${product} Stock`}
            />
            </React.Fragment>
        ))}
        </LineChart>
        </ResponsiveContainer>
        </div>
    );
};

export default SalesTrendsChart;
