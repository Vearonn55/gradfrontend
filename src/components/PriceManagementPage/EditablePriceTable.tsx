import React, { useState } from 'react';
import './EditablePriceTable.css';

interface Product {
    id: number;
    name: string;
    currentPrice: number;
    newPrice?: number;
}

interface EditablePriceTableProps {
    products: Product[];
    onPriceUpdate: (productId: number, newPrice: number) => void;
    validationFn?: (price: number) => boolean;
}

const EditablePriceTable: React.FC<EditablePriceTableProps> = ({
                                                                   products,
                                                                   onPriceUpdate,
                                                                   validationFn,
                                                               }) => {
    // Sadece burayı değiştirdik:
    const [editedProducts, setEditedProducts] = useState<Product[]>(products);

    const handlePriceChange = (id: number, value: string) => {
        const updatedValue = parseFloat(value);
        setEditedProducts((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, newPrice: isNaN(updatedValue) ? 0 : updatedValue } : p
            )
        );
    };

    const handleUpdateClick = (productId: number) => {
        // Burada da find'i editedProducts üzerinden çağırıyoruz:
        const productToUpdate = editedProducts.find((p) => p.id === productId);

        if (!productToUpdate || productToUpdate.newPrice == null) return;

        if (validationFn && !validationFn(productToUpdate.newPrice)) {
            alert(`Price ${productToUpdate.newPrice} is not valid!`);
            return;
        }

        onPriceUpdate(productId, productToUpdate.newPrice);
    };

    return (
        <table className="price-table">
            <thead>
            <tr>
                <th>Product Name</th>
                <th>Current Price</th>
                <th>New Price</th>
                <th>Update</th>
            </tr>
            </thead>
            <tbody>
            {/* Burada da map'i editedProducts üzerinden kullanıyoruz: */}
            {editedProducts.map((product) => (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>${product.currentPrice.toFixed(2)}</td>
                    <td>
                        <input
                            type="number"
                            value={product.newPrice ?? product.currentPrice}
                            onChange={(e) => handlePriceChange(product.id, e.target.value)}
                            className="price-input"
                        />
                    </td>
                    <td>
                        <button onClick={() => handleUpdateClick(product.id)}>
                            Update
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default EditablePriceTable;
