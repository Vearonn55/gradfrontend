// src/components/LoginPage/LoginPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login(username, password);
        navigate("/dashboard");
    };

    return (
        <div className="login-container">
            <h2>LOGIN</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>

            {/* Burayı güncelledik: */}
            <div className="forgot-password">
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <div className="google-login">
                <img
                    src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                    alt="Google"
                    className="google-icon"
                />
                <span>Login with Google</span>
            </div>
        </div>
    );
};

export default LoginPage;
