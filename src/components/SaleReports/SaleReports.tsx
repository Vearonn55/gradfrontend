import React, { useState, useMemo } from "react";
import { useSales } from "../context/SalesContext";
import { useProducts } from "../context/ProductContext";
import "./SaleReports.css";

const SaleReports: React.FC = () => {
    const { sales } = useSales();
    const { products } = useProducts();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredSales = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return sales.filter(sale => {
            const product = products.find(p => p.id === sale.productId);
            return (
                (sale.productId?.toString() || "").includes(query) ||
                (product?.name?.toLowerCase() || "").includes(query) ||
                (product?.categoryId?.toString() || "").includes(query)
            );
        });
    }, [sales, products, searchQuery]);

    const exportCSV = () => {
        const header = "Product ID,Product Name,Category ID,Quantity,Unit Price,Total,Date\n";
        const rows = filteredSales.map(sale => {
            const product = products.find(p => p.id === sale.productId);
            const total = sale.quantity * sale.unitPrice;
            return `${sale.productId},${product?.name || "Unknown"},${product?.categoryId || "-"},${sale.quantity},${sale.unitPrice},${total},${sale.date}`;
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
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {filteredSales.map(sale => {
                    const product = products.find(p => p.id === sale.productId);
                    const total = sale.quantity * sale.unitPrice;
                    return (
                        <tr key={sale.id}>
                            <td>{sale.productId}</td>
                            <td>{product?.name || "—"}</td>
                            <td>{product?.categoryId || "—"}</td>
                            <td>{sale.quantity}</td>
                            <td>${sale.unitPrice.toFixed(2)}</td>
                            <td>${total.toFixed(2)}</td>
                            <td>{new Date(sale.date).toLocaleString()}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default SaleReports;
