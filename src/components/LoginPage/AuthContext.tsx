import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const login = async (username: string, password: string) => {
        console.log('🚀 Attempting login with:', username, password);
    
        try {
            const response = await fetch('http://localhost:5050/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    UserName: username,
                    Password: password,
                }),
            });
    
            console.log('📡 Response status:', response.status);
    
            const data = await response.json();
            console.log('📨 Response body:', data);
    
            if (!response.ok || !data.token) {
                throw new Error(data.message || 'Login failed');
            }
    
            localStorage.setItem('authToken', data.token); // Save JWT
            localStorage.setItem('userInfo', JSON.stringify(data.user)); // Optional: Save user info
            setIsAuthenticated(true);
            console.log('✅ Login successful. Token saved.');
        } catch (error) {
            console.error('❌ Login error:', error);
            setIsAuthenticated(false);
        }
    };
    
    

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
