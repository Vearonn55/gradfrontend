import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
    id: number;
    name: string;
    description?: string;
    nutritionalFacts?: string;
    categoryId: number;
    price: number;
    expiryDate: string;
    stockQuantity: number;
}

interface ProductContextType {
    products: Product[];
    addProduct: (p: Product) => void;
    updateProduct: (id: number, payload: Partial<Product>) => void;
    deleteProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const STORAGE_KEY = "inventory";
    const [products, setProducts] = useState<Product[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }, [products]);

    const addProduct = (product: Product) => {
        setProducts(prev => [...prev, product]);
    };

    const updateProduct = (id: number, payload: Partial<Product>) => {
        setProducts(prev =>
            prev.map(p => (p.id === id ? { ...p, ...payload } : p))
        );
    };

    const deleteProduct = (id: number) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export function useProducts() {
    const ctx = useContext(ProductContext);
    if (!ctx) throw new Error("useProducts must be used within a ProductsProvider");
    return ctx;
}
