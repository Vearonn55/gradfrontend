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

interface SalesData {
    date: string;
    sales: number;
    product: string;
    stock: number;
}

interface SalesTrendsChartProps {
    data: SalesData[];
}

const SalesTrendsChart: React.FC<SalesTrendsChartProps> = ({ data }) => {
    // Verileri ürünlere göre grupla
    const groupedData = data.reduce((acc: any[], curr) => {
        const existingDate = acc.find(item => item.date === curr.date);
        if (existingDate) {
            existingDate[`${curr.product} Sales`] = curr.sales;
            existingDate[`${curr.product} Stock`] = curr.stock;
        } else {
            acc.push({
                date: curr.date,
                [`${curr.product} Sales`]: curr.sales,
                [`${curr.product} Stock`]: curr.stock
            });
        }
        return acc;
    }, []);

    // Ürün isimlerini al
    const productNames = Array.from(new Set(data.map(item => item.product)));

    return (
        <div className="sales-trends-container">
            <h3>Sales and Stock Trends by Product</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={groupedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    {productNames.map((product, index) => (
                        <React.Fragment key={product}>
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey={`${product} Sales`}
                                stroke={`hsl(${index * 120}, 70%, 50%)`}
                                strokeWidth={2}
                                name={`${product} Sales`}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey={`${product} Stock`}
                                stroke={`hsl(${index * 120}, 70%, 70%)`}
                                strokeWidth={2}
                                name={`${product} Stock`}
                                strokeDasharray="5 5"
                            />
                        </React.Fragment>
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesTrendsChart;
