import React from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';


interface SalesData {
    date: string;
    sales: number;
}

interface SalesTrendsChartProps {
    data: SalesData[];
}

const SalesTrendsChart: React.FC<SalesTrendsChartProps> = ({ data }) => {
    return (
        <div className="sales-trends-container">
            <h3>Sales Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesTrendsChart;
