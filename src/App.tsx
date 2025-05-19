// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/LoginPage/AuthContext";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage/ForgotPasswordPage";
import MainLayout from "./components/MainPage/MainLayout";

// **DİKKAT**: contexts dizinindeki dosyalarıza göre path’leri düzenleyin
import { ProductsProvider } from "./components/context/ProductContext";
import { SalesProvider } from "./components/context/SalesContext";

const App: React.FC = () => (
    <AuthProvider>
        <ProductsProvider>
            <SalesProvider>
                <Router>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/signup" element={<SignUpPage />} />

                        {/* Protected Routes */}
                        <Route
                            path="/*"
                            element={
                                <RequireAuth>
                                    <MainLayout />
                                </RequireAuth>
                            }
                        />
                    </Routes>
                </Router>
            </SalesProvider>
        </ProductsProvider>
    </AuthProvider>
);

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default App;
