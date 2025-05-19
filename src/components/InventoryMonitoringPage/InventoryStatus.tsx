import React from 'react';

interface InventoryItem {
    id: number;
    name: string;
    stock: number;
    threshold: number; // Stok eşiği (ör: 5 altındaysa “low stock”)
}

interface InventoryStatusProps {
    items: InventoryItem[];
    onSelectItem: (itemId: number) => void; // Tıklanan ürünü seçmek için
}

const InventoryStatus: React.FC<InventoryStatusProps> = ({ items, onSelectItem }) => {
    // Az stokta olan ürünleri filtreleyelim:
    const lowStockItems = items.filter((item) => item.stock < item.threshold);

    return (
        <div className="inventory-status-container">
            <h3>Inventory Status (Low Stock Alerts)</h3>
            {lowStockItems.length === 0 ? (
                <p>No low stock alerts at the moment.</p>
            ) : (
                <ul>
                    {lowStockItems.map((item) => (
                        <li key={item.id} onClick={() => onSelectItem(item.id)}>
                            <span className="item-name">{item.name}</span>
                            <span className="item-stock">Stock: {item.stock}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default InventoryStatus;
