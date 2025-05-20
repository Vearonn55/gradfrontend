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

interface PriceHistoryData {
    date: string;
    price: number;
    product: string;
    stock: number;
}

interface PriceHistoryChartProps {
    data: PriceHistoryData[];
}

const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ data }) => {
    // Verileri ürünlere göre grupla
    const groupedData = data.reduce((acc: any[], curr) => {
        const existingDate = acc.find(item => item.date === curr.date);
        if (existingDate) {
            existingDate[`${curr.product} Price`] = curr.price;
            existingDate[`${curr.product} Stock`] = curr.stock;
        } else {
            acc.push({
                date: curr.date,
                [`${curr.product} Price`]: curr.price,
                [`${curr.product} Stock`]: curr.stock
            });
        }
        return acc;
    }, []);

    // Ürün isimlerini al
    const productNames = Array.from(new Set(data.map(item => item.product)));

    return (
        <div className="price-history-container">
            <h3>Price and Stock History by Product</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={groupedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" stroke="#82ca9d" />
                    <YAxis yAxisId="right" orientation="right" stroke="#8884d8" />
                    <Tooltip />
                    <Legend />
                    {productNames.map((product, index) => (
                        <React.Fragment key={product}>
                            <Bar
                                yAxisId="left"
                                dataKey={`${product} Price`}
                                fill={`hsl(${index * 120}, 70%, 50%)`}
                                name={`${product} Price`}
                            />
                            <Bar
                                yAxisId="right"
                                dataKey={`${product} Stock`}
                                fill={`hsl(${index * 120}, 70%, 70%)`}
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
