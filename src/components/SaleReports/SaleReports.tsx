import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./SaleReports.css";

interface Product {
    ProductID: number;
    ProductName: string;
    CategoryID: number;
}

interface Sale {
    SaleID: number;
    ProductID: number;
    Quantity: number;
    UnitPrice: number;
    Total: number;
    SaleDate: string;
    Product: Product;
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
        return (sales || []).filter((sale) => {
            return (
                (sale.Product?.ProductName?.toLowerCase() || "").includes(query) ||
                (sale.Product?.CategoryID?.toString() || "").includes(query) ||
                (sale.Product?.ProductID?.toString() || "").includes(query)
            );
        });
    }, [sales, searchQuery]);

    const exportCSV = () => {
        const header = "Product ID,Product Name,Category ID,Sale Quantity,Unit Price,Total Sold,Date\n";
        const rows = filteredSales.map((sale) => {
            const total = (sale.Quantity ?? 0) * (sale.UnitPrice ?? 0);
            return `${sale.Product?.ProductID},${sale.Product?.ProductName || "Unknown"},${sale.Product?.CategoryID || "-"},${sale.Quantity},${sale.UnitPrice},${total},${sale.SaleDate}`;
        }).join("\n");

        const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "sales_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportPDF = () => {
        alert("Export PDF not implemented yet, you can integrate jsPDF.");
    };

    return (
        <div className="sale-reports-container">
            <h2>Sale Reports</h2>
            <div className="report-header">
                <input
                    type="text"
                    placeholder="Search by Product ID, Name or Category ID"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <div className="export-buttons">
                    <button onClick={exportCSV}>Export CSV</button>
                    <button onClick={exportPDF}>Export PDF</button>
                </div>
            </div>

            <table className="sales-report-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Category ID</th>
                        <th>Sale Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Sold</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSales.map((sale) => {
                        const unitPrice = sale.UnitPrice ?? 0;
                        const quantity = sale.Quantity ?? 0;
                        const total = quantity * unitPrice;
                        return (
                            <tr key={sale.SaleID}>
                                <td>{sale.Product?.ProductID}</td>
                                <td>{sale.Product?.ProductName || "—"}</td>
                                <td>{sale.Product?.CategoryID || "—"}</td>
                                <td>{quantity}</td>
                                <td>${unitPrice.toFixed(2)}</td>
                                <td>${total.toFixed(2)}</td>
                                <td>{new Date(sale.SaleDate).toLocaleString()}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default SaleReports;
