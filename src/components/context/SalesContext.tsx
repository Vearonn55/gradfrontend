import React, { createContext, useContext, useState } from "react";

// Sale Model Type
export interface Sale {
    id: number;
    productId: number;
    quantity: number;
    unitPrice: number;  // ✅ Eksik olan alan eklendi
    date: string;
}

// Context Type Interface
export interface SalesContextType {
    sales: Sale[];
    addSale: (sale: Omit<Sale, "id">) => void;
    updateSale: (id: number, updatedSale: Partial<Sale>) => void;  // ✅ Eklendi
    deleteSale: (id: number) => void;  // ✅ Eklendi
}

// Context oluşturuluyor
const SalesContext = createContext<SalesContextType | undefined>(undefined);

// Provider
export const SalesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sales, setSales] = useState<Sale[]>([]);

    const addSale = (sale: Omit<Sale, "id">) => {
        const newSale: Sale = { id: Date.now(), ...sale };
        setSales(prev => [...prev, newSale]);
    };

    const updateSale = (id: number, updatedSale: Partial<Sale>) => {
        setSales(prev => prev.map(s => s.id === id ? { ...s, ...updatedSale } : s));
    };

    const deleteSale = (id: number) => {
        setSales(prev => prev.filter(s => s.id !== id));
    };

    return (
        <SalesContext.Provider value={{ sales, addSale, updateSale, deleteSale }}>
            {children}
        </SalesContext.Provider>
    );
};

// Hook ile kullanmak için
export const useSales = (): SalesContextType => {
    const context = useContext(SalesContext);
    if (!context) throw new Error("useSales must be used within a SalesProvider");
    return context;
};
