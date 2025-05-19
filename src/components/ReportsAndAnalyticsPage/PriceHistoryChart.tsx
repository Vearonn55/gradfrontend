import React from 'react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';

interface PriceHistoryData {
    date: string;
    price: number;
}

interface PriceHistoryChartProps {
    data: PriceHistoryData[];
}

const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ data }) => {
    return (
        <div className="price-history-container">
            <h3>Price History</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="price" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceHistoryChart;
