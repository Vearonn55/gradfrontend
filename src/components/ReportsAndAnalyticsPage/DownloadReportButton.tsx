import React from 'react';

interface DownloadReportButtonProps<T> {
    reportName: string;
    data: T[];
}

const DownloadReportButton = <T,>({ reportName, data }: DownloadReportButtonProps<T>) => {
    const downloadReport = () => {
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

    return <button onClick={downloadReport}>Download JSON Report</button>;
};

export default DownloadReportButton;
