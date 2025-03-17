import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/LoginPage/AuthContext";
import LoginPage from "./components/LoginPage/LoginPage";
import MainLayout from "./components/MainPage/MainLayout";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/*" // Tüm diğer yollar için
                        element={
                            <RequireAuth>
                                <MainLayout />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

// Giriş kontrolü için bir bileşen
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
};

export default App;