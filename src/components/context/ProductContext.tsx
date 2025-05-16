import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
    id: number;
    name: string;
    category: string;
    stock: number;
    weight: number;
    price: number;
    threshold: number;
    description?: string;
    createdAt: string;
}

type NewProduct = Omit<Product, "threshold">;

interface ProductContextType {
    products: Product[];
    addProduct: (p: NewProduct) => void;
    updateProduct: (id: number, payload: Partial<NewProduct>) => void;
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

    const addProduct = (newProd: NewProduct) => {
        setProducts(prev => [
            ...prev,
            { ...newProd, threshold: newProd.stock },
        ]);
    };

    const updateProduct = (id: number, payload: Partial<NewProduct>) => {
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
    if (!ctx) throw new Error("useProducts must be inside ProductsProvider");
    return ctx;
}
