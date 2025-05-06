import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import ExportInventoryButton from './ExportInventoryButton';
import './InventoryPage.css';

interface InventoryItem {
    id: number;
    name: string;
    category: string;
    stock: number;
    weight: number;
    price: number;
    threshold: number;
    description?: string;
}

export default function InventoryPage() {
    // State yükleme ve kalıcı saklama için localStorage anahtarı
    const STORAGE_KEY = 'inventory';

    const [inventory, setInventory] = useState<InventoryItem[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) as InventoryItem[] : [];
    });
    const [newProduct, setNewProduct] = useState<Omit<InventoryItem, 'id' | 'threshold'>>({
        name: '',
        category: '',
        stock: 0,
        weight: 0,
        price: 0,
        description: '',
    });

    // inventory her değiştiğinde localStorage'a kaydet
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
    }, [inventory]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: ['stock', 'weight', 'price'].includes(name)
                ? Number(value)
                : value,
        }));
    };

    const handleCreateProduct = (e: FormEvent) => {
        e.preventDefault();
        // Zorunlu alan kontrolü: stock ve weight pozitif olmalı
        if (newProduct.stock < 1 || newProduct.weight < 1) return;
        const id = inventory.length > 0
            ? Math.max(...inventory.map(item => item.id)) + 1
            : 1;
        const product: InventoryItem = {
            id,
            ...newProduct,
            threshold: newProduct.stock,
        };
        setInventory(prev => [...prev, product]);
        setNewProduct({ name: '', category: '', stock: 0, weight: 0, price: 0, description: '' });
    };

    const handleRemoveProduct = (productId: number) => {
        setInventory(prev => prev.filter(item => item.id !== productId));
    };

    return (
        <div className="inventory-page-container">
            <h2>Inventory Management</h2>

            {/* Yeni Ürün Oluşturma Formu */}
            <form className="create-product-form" onSubmit={handleCreateProduct}>
                <input
                    name="name"
                    type="text"
                    placeholder="Ürün Adı"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    name="category"
                    type="text"
                    placeholder="Ürün Tipi"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    required
                />
                <input
                    name="stock"
                    type="number"
                    placeholder="Enter quantity (adet)"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    min={1}
                    required
                />
                <input
                    name="weight"
                    type="number"
                    placeholder="Kaç litre veya kilo"
                    value={newProduct.weight}
                    onChange={handleInputChange}
                    min={1}
                    required
                />
                <input
                    name="price"
                    type="number"
                    placeholder="Fiyat"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    min={0}
                />
                <input
                    name="description"
                    type="text"
                    placeholder="Açıklama (isteğe bağlı)"
                    value={newProduct.description}
                    onChange={handleInputChange}
                />
                <button type="submit" className="create-product-btn">Oluştur</button>
            </form>

            {/* Envanter Listesi ve Kaldırma */}
            <div className="inventory-status-container">
                <h3>Inventory Status</h3>
                <ul>
                    {inventory.map(item => (
                        <li key={item.id}>
                            {item.name}: {item.stock} adet, {item.weight} {item.weight > 1 ? 'birim' : 'birim'}
                            <button
                                className="remove-btn"
                                onClick={() => handleRemoveProduct(item.id)}
                            >
                                Kaldır
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* CSV / PDF Export */}
            <div className="export-buttons-container">
                <ExportInventoryButton items={inventory} />
            </div>
        </div>
    );
}
