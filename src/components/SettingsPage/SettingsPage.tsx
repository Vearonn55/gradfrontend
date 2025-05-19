/* src/components/SettingsPage/SettingsPage.tsx */
import React, { useState } from 'react';
import './SettingsPage.css';

const SettingsPage: React.FC = () => {
    // Profile
    const [email, setEmail] = useState('user@example.com');

    // Password change
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Preferences
    const [emailNotif, setEmailNotif] = useState(true);
    const [smsNotif, setSmsNotif] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [language, setLanguage] = useState<'en' | 'tr'>('en');

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Profile updated:', { email });
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('New password and confirm do not match');
            return;
        }
        console.log('Password changed');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handlePrefsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Preferences:', { emailNotif, smsNotif, theme, language });
    };

    return (
        <div className="settings-container">
            <h1>Settings</h1> 
            
            <div className="row">
                <div className="col-6">
                    <section className="settings-section">
                        <h3>Profile Information</h3>
                        <form onSubmit={handleProfileSubmit} className="settings-form">
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn">Save Profile</button>
                        </form>
                    </section>
                </div>
                <div className="col-6">
                    <section className="settings-section">
                        <h3>Change Password</h3>
                        <form onSubmit={handlePasswordSubmit} className="settings-form">
                            <div className="form-group">
                                <label>Current Password:</label>
                                <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>New Password:</label>
                                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password:</label>
                                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn">Change Password</button>
                        </form>
                    </section>
                </div>
            </div>
            
            <div className="row">
                <div className="col-6">
                    <section className="settings-section">
                        <h3>Notification Preferences</h3>
                        <form onSubmit={handlePrefsSubmit} className="settings-form">
                            <div className="form-group">
                                <label>Email Notifications:</label>
                                <input type="checkbox" checked={emailNotif} onChange={e => setEmailNotif(e.target.checked)} />
                            </div>
                            <div className="form-group">
                                <label>SMS Notifications:</label>
                                <input type="checkbox" checked={smsNotif} onChange={e => setSmsNotif(e.target.checked)} />
                            </div>
                            <button type="submit" className="btn">Save Notifications</button>
                        </form>
                    </section>
                </div>
                <div className="col-6">
                    <section className="settings-section">
                        <h2>System Settings</h2>
                        <form onSubmit={handlePrefsSubmit} className="settings-form">
                            <div className="form-group">
                                <label>Theme:</label>
                                <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')}>
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Language:</label>
                                <select value={language} onChange={e => setLanguage(e.target.value as 'en' | 'tr')}>
                                    <option value="en">English</option>
                                    <option value="tr">Türkçe</option>
                                </select>
                            </div>
                            <button type="submit" className="btn">Save System Settings</button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;