import React from 'react';


interface ProductDetails {
    id: number;
    name: string;
    stock: number;
    price: number;
    category: string;
    description?: string;
}

interface ProductDetailsViewProps {
    product?: ProductDetails; // Seçilmemiş olabileceği için optional
    onClose: () => void;
}

const ProductDetailsView: React.FC<ProductDetailsViewProps> = ({ product, onClose }) => {
    if (!product) {
        return (
            <div className="product-details-container">
                <h3>Product Details</h3>
                <p>No product selected.</p>
            </div>
        );
    }

    return (
        <div className="product-details-container">
            <button className="close-button" onClick={onClose}>
                X
            </button>
            <h3>Product Details</h3>
            <div className="details-item">
                <span>Name:</span>
                <span>{product.name}</span>
            </div>
            <div className="details-item">
                <span>Category:</span>
                <span>{product.category}</span>
            </div>
            <div className="details-item">
                <span>Price:</span>
                <span>${product.price.toFixed(2)}</span>
            </div>
            <div className="details-item">
                <span>Stock:</span>
                <span>{product.stock}</span>
            </div>
            {product.description && (
                <div className="details-item">
                    <span>Description:</span>
                    <span>{product.description}</span>
                </div>
            )}
        </div>
    );
};

export default ProductDetailsView;
