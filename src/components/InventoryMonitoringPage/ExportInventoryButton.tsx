import React from 'react';


interface InventoryItem {
    id: number;
    name: string;
    stock: number;
    price: number;
    category: string;
    description?: string;
}

interface ExportInventoryButtonProps {
    items: InventoryItem[];
}

const ExportInventoryButton: React.FC<ExportInventoryButtonProps> = ({ items }) => {
    const exportCSV = () => {
        // CSV başlık satırı
        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'ID,Name,Stock,Price,Category,Description\n';

        // Satırları ekleyelim
        items.forEach((item) => {
            const row = [
                item.id,
                item.name.replace(/,/g, ''), // virgülleri çıkartıyoruz
                item.stock,
                item.price,
                item.category.replace(/,/g, ''),
                item.description ? item.description.replace(/,/g, '') : '',
            ];
            csvContent += row.join(',') + '\n';
        });

        // Blob link oluştur
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'inventory_export.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportPDF = () => {
        // Gerçek projede jsPDF gibi kütüphaneler kullanarak PDF oluşturulabilir.
        // Burada basit bir uyarı veriyoruz:
        alert('PDF export not implemented yet.');
    };

    return (
        <div className="export-buttons-container">
            <button onClick={exportCSV}>Export CSV</button>
            <button onClick={exportPDF}>Export PDF</button>
        </div>
    );
};

export default ExportInventoryButton;
