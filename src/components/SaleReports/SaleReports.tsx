import { API_BASE_URL } from '../../config';

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./SaleReports.css";

interface Sale {
    SaleID: number;
    ProductID: number;
    Quantity: number;
    SaleDateTime: string;
}

const SaleReports: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchSalesReport = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.post(
                    "/api/reports",
                    { type: "Sales" },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("🧪 Response data:", response.data);
                setSales(response.data.data);
            } catch (error) {
                console.error("Failed to fetch sales report:", error);
            }
        };
        fetchSalesReport();
    }, []);

    const filteredSales = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return (sales || []).filter((sale) =>
            sale.ProductID.toString().includes(query) ||
            sale.SaleID.toString().includes(query)
        );
    }, [sales, searchQuery]);

    const exportCSV = (sale: Sale) => {
        const header = "Sale ID,Product ID,Quantity,Sale DateTime\n";
        const row = `${sale.SaleID},${sale.ProductID},${sale.Quantity},${sale.SaleDateTime}\n`;

        const blob = new Blob([header + row], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `sale_${sale.SaleID}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportPDF = (sale: Sale) => {
        alert(`PDF export for Sale ID ${sale.SaleID} not implemented.`);
        // Replace with jsPDF integration if needed
    };

    return (
        <div className="sale-reports-container">
            <h2>Sale Reports</h2>
            <div className="report-header">
                <input
                    type="text"
                    placeholder="Search by Sale ID or Product ID"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>

            <table className="sales-report-table">
                <thead>
                    <tr>
                        <th>Sale ID</th>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Sale DateTime</th>
                        <th>Export</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSales.map((sale) => (
                        <tr key={sale.SaleID}>
                            <td>{sale.SaleID}</td>
                            <td>{sale.ProductID}</td>
                            <td>{sale.Quantity}</td>
                            <td>{new Date(sale.SaleDateTime).toLocaleString()}</td>
                            <td>
                                <button onClick={() => exportCSV(sale)}>CSV</button>
                                <button onClick={() => exportPDF(sale)}>PDF</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SaleReports;
