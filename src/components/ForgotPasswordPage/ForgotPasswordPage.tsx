// src/components/ForgotPasswordPage/ForgotPasswordPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPasswordPage.css";
import { API_BASE_URL } from '../../config';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Burada backend'e reset isteği atılacak.
        // Örnek: await api.post("/auth/forgot-password", { email });
        setSubmitted(true);
        // İsterseniz kısa bir süre sonra login sayfasına yönlendirebilirsiniz:
        // setTimeout(() => navigate("/login"), 3000);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Şifre Sıfırlama</h2>

                {!submitted ? (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email Adresiniz:</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="email@ornek.com"
                                required
                            />
                        </div>
                        <button type="submit">Sıfırlama Linki Gönder</button>
                    </form>
                ) : (
                    <p className="info">
                        Eğer bu adrese kayıtlı bir hesap varsa, kısa süre içinde bir sıfırlama
                        linki gelecektir.
                    </p>
                )}

                <div className="back-login">
                    <Link to="/login">
                        <button>Giriş Sayfasına Dön</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
