import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Alan doğrulaması
        if (!username.trim()) {
            setError("Lütfen kullanıcı adınızı girin.");
            return;
        }
        if (!password) {
            setError("Lütfen şifrenizi girin.");
            return;
        }
        setError("");
        login(username, password);
        navigate("/dashboard");
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
                {error && <p className="error-message">{error}</p>}
            </form>

            <div className="login-links">
                <Link to="/forgot-password" className="forgot-password">
                    Forgot Password?
                </Link>
                <Link to="/signup">
                    <button className="signup-button">Sign Up</button>
                </Link>
            </div>

            <div className="google-login">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="Google"
                    className="google-icon"
                />
                <span>Login with Google</span>
            </div>
        </div>
    );
};

export default LoginPage;
