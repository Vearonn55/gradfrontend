import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./LoginPage.css"; // CSS dosyasını içe aktar
import { API_BASE_URL } from '../../config';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        //console.log('🔑 Login button clicked');
    
        try {
            await login(username, password);
            //console.log('✅ Login complete, navigating to dashboard');
            navigate("/dashboard");
        } catch (err) {
            console.error('❌ Login failed:', err);
            // optionally display error to user
        }
    };
    

    return (
        <div className="login-container">
            <h2>Login</h2>
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
            <a href="#" className="forgot-password">
                Forgot Password?
            </a>
            {/* Google ile Giriş Yap (Örnek) */}
            <div className="google-login">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" // Google logosu (örnek)
                    alt="Google"
                    className="google-icon"
                />
                <span>Login with Google</span>
            </div>
        </div>
    );
};

export default LoginPage;
