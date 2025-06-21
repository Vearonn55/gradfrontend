// src/components/SignUpPage/SignUpPage.tsx
import { API_BASE_URL } from '../../config';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpPage.css";

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({
            ...f,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basit alan doğrulama
        if (!form.name.trim()) {
            setError("Lütfen adınızı girin.");
            return;
        }
        if (!form.email.trim()) {
            setError("Lütfen email adresinizi girin.");
            return;
        }
        if (!form.password) {
            setError("Lütfen bir şifre girin.");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError("Şifreler eşleşmiyor!");
            return;
        }
        if (!form.agreeTerms) {
            setError("Kullanım şartlarını kabul etmelisiniz.");
            return;
        }
        setError("");
        // TODO: signup API çağrısı
        navigate("/login");
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Hesap Oluştur</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Ad Soyad:</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Adınız Soyadınız"
                            required
                        />
                    </div>

                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="email@ornek.com"
                            required
                        />
                    </div>

                    <div>
                        <label>Şifre:</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Şifreniz"
                            required
                        />
                    </div>

                    <div>
                        <label>Şifre (Tekrar):</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Tekrar girin"
                            required
                        />
                    </div>

                    <div className="terms">
                        <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={form.agreeTerms}
                            onChange={handleChange}
                        />
                        <label>Kullanım şartlarını kabul ediyorum</label>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit">Kayıt Ol</button>
                </form>

                <div className="back-login">
                    <span>Zaten hesabın var mı?</span>
                    <Link to="/login">
                        <button>Giriş Yap</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
