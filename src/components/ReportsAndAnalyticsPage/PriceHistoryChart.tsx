import React from 'react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from 'recharts';

export interface PriceHistoryData {
    date: string;
    price: number;
    product: string;
    stock: number;
}

interface PriceHistoryChartProps {
    data: PriceHistoryData[];
}

const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ data }) => {
    const groupedData = data.reduce((acc: any[], curr) => {
        const existing = acc.find(item => item.date === curr.date);
        if (existing) {
            existing[`${curr.product} Price`] = curr.price;
            existing[`${curr.product} Stock`] = curr.stock;
        } else {
            acc.push({
                date: curr.date,
                [`${curr.product} Price`]: curr.price,
                [`${curr.product} Stock`]: curr.stock
            });
        }
        return acc;
    }, []);

    const productNames = Array.from(new Set(data.map(item => item.product)));

    return (
        <div className="price-history-container">
        <h3>Price and Stock History by Product</h3>
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={groupedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        {productNames.map((product, index) => (
            <React.Fragment key={product}>
            <Bar
            yAxisId="left"
            dataKey={`${product} Price`}
            fill={`hsl(${index * 60}, 70%, 50%)`}
            name={`${product} Price`}
            />
            <Bar
            yAxisId="right"
            dataKey={`${product} Stock`}
            fill={`hsl(${index * 60}, 70%, 75%)`}
            name={`${product} Stock`}
            />
            </React.Fragment>
        ))}
        </BarChart>
        </ResponsiveContainer>
        </div>
    );
};

export default PriceHistoryChart;
