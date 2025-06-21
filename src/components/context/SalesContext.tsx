import React, { createContext, useContext, useState, useEffect } from "react";
import { useProducts } from "./ProductContext"; // Stok güncellemek için ürünlere erişim
import { API_BASE_URL } from '../../config';

export interface Sale {
    id: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    date: string;
}

export interface SalesContextType {
    sales: Sale[];
    addSale: (sale: Omit<Sale, "id">) => void;
    updateSale: (id: number, updatedSale: Partial<Sale>) => void;
    deleteSale: (id: number) => void;
    confirmCheckout: () => void;
    checkout: Omit<Sale, "id">[];
    addToCheckout: (sale: Omit<Sale, "id">) => void;
    clearCheckout: () => void;
}

const SalesContext = createContext<SalesContextType | undefined>(undefined);

export const SalesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sales, setSales] = useState<Sale[]>(() => {
        const stored = localStorage.getItem("sales");
        return stored ? JSON.parse(stored) : [];
    });

    const [checkout, setCheckout] = useState<Omit<Sale, "id">[]>([]);
    const { updateProduct, products } = useProducts(); // Stoklara müdahale için

    useEffect(() => {
        localStorage.setItem("sales", JSON.stringify(sales));
    }, [sales]);

    const addSale = (sale: Omit<Sale, "id">) => {
        const newSale: Sale = { id: Date.now(), ...sale };
        setSales(prev => [...prev, newSale]);

        const matched = products.find(p => p.id === sale.productId);
        if (matched) {
            const updatedQty = matched.stockQuantity - sale.quantity;
            updateProduct(matched.id, { stockQuantity: Math.max(0, updatedQty) });
        }
    };

    const updateSale = (id: number, updatedSale: Partial<Sale>) => {
        setSales(prev => {
            return prev.map(s => {
                if (s.id === id) {
                    const oldQty = s.quantity;
                    const newQty = updatedSale.quantity ?? oldQty;

                    const matched = products.find(p => p.id === s.productId);
                    if (matched && updatedSale.quantity != null) {
                        const diff = newQty - oldQty;
                        const newStock = matched.stockQuantity - diff;
                        updateProduct(matched.id, { stockQuantity: Math.max(0, newStock) });
                    }

                    return { ...s, ...updatedSale };
                }
                return s;
            });
        });
    };

    const deleteSale = (id: number) => {
        setSales(prev => prev.filter(s => s.id !== id));
    };

    const addToCheckout = (sale: Omit<Sale, "id">) => {
        setCheckout(prev => [...prev, sale]);
    };

    const clearCheckout = () => {
        setCheckout([]);
    };

    const confirmCheckout = () => {
        checkout.forEach(item => addSale(item));
        clearCheckout();
    };

    return (
        <SalesContext.Provider
            value={{
                sales,
                addSale,
                updateSale,
                deleteSale,
                confirmCheckout,
                checkout,
                addToCheckout,
                clearCheckout
            }}
        >
            {children}
        </SalesContext.Provider>
    );
};

export const useSales = (): SalesContextType => {
    const context = useContext(SalesContext);
    if (!context) throw new Error("useSales must be used within a SalesProvider");
    return context;
};
