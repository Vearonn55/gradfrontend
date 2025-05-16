// src/contexts/SalesContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Sale {
    id: number;
    productId: number;
    quantity: number;
    date: string; // ISO string
}

interface SalesContextType {
    sales: Sale[];
    addSale: (s: Omit<Sale,"id">) => void;
}

const SalesContext = createContext<SalesContextType|undefined>(undefined);

export const SalesProvider: React.FC<{children:ReactNode}> = ({children}) => {
    const [sales, setSales] = useState<Sale[]>([]);
    const addSale = (newSale: Omit<Sale,"id">) => {
        const id = sales.length ? Math.max(...sales.map(s=>s.id))+1 : 1;
        setSales(prev => [...prev, { ...newSale, id }]);
    };
    return (
        <SalesContext.Provider value={{sales, addSale}}>
            {children}
        </SalesContext.Provider>
    );
};

export function useSales() {
    const ctx = useContext(SalesContext);
    if (!ctx) throw new Error("useSales must be under SalesProvider");
    return ctx;
}
