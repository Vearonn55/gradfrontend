import React from 'react';


interface DownloadReportButtonProps {
    reportName: string;
    data: any[]; // Gerçekte tip tanımı yapabilirsiniz
}

const DownloadReportButton: React.FC<DownloadReportButtonProps> = ({
                                                                       reportName,
                                                                       data
                                                                   }) => {

    const handleDownloadCSV = () => {
        // CSV başlık satırı (basit bir örnek)
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'Key,Value\n';

        data.forEach((row) => {
            // Object.values() yerine Object.keys() ile erişiyoruz
            const csvRow = Object.keys(row)
                .map((key) => row[key])
                .join(',');

            csvContent += csvRow + '\n';
        });

        // Oluşturulan CSV içeriğini indirme linkine dönüştür
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `${reportName}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDownloadPDF = () => {
        alert('PDF export not implemented yet!');
    };

    return (
        <div className="download-report-button">
            <button className="action-btn primary-btn" onClick={handleDownloadCSV}>Download CSV</button>
            <button className="action-btn primary-btn" onClick={handleDownloadPDF}>Download PDF</button>
        </div>
    );
};

export default DownloadReportButton;
