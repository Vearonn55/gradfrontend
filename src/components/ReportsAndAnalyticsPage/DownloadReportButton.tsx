import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface DownloadReportButtonProps<T> {
    reportName: string;
    data: T[];
}

const DownloadReportButton = <T,>({ reportName, data }: DownloadReportButtonProps<T>) => {
    const downloadJSON = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${reportName}-${new Date().toISOString()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const downloadCSV = () => {
        if (data.length === 0) return;

        const headers = Object.keys(data[0] as object);
        const rows = data.map(item => headers.map(header => (item as any)[header]));

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${reportName}-${new Date().toISOString()}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const downloadPDF = () => {
        if (data.length === 0) return;

        const doc = new jsPDF();
        const headers = [Object.keys(data[0] as object)];
        const rows = data.map(item => headers[0].map(header => (item as any)[header]));

        doc.setFontSize(14);
        doc.text(`${reportName} Report`, 14, 20);
        autoTable(doc, {
            startY: 30,
            head: headers,
            body: rows
        });

        doc.save(`${reportName}-${new Date().toISOString()}.pdf`);
    };

    return (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={downloadJSON}>Download JSON</button>
            <button onClick={downloadCSV}>Download CSV</button>
            <button onClick={downloadPDF}>Download PDF</button>
        </div>
    );
};

export default DownloadReportButton;
