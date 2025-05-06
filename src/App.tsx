// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/LoginPage/AuthContext";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage/ForgotPasswordPage";
import MainLayout from "./components/MainPage/MainLayout";

const App: React.FC = () => {
    return (
        <AuthProvider>
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
        </AuthProvider>
    );
};

// Giriş kontrolü için HOC benzeri bileşen
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? (
        <>{children}</>
    ) : (
        // Eğer kullanıcı giriş yapmadıysa login sayfasına yönlendir
        <Navigate to="/login" replace />
    );
};

export default App;
