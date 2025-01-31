import React, { useState } from 'react';
import './PasswordInput.css';

interface PasswordInputProps {
    value: string;
    onChange: (newValue: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const handleTogglePassword = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="password-container">
            <label htmlFor="passwordField">Password</label>
            <div className="password-input-wrapper">
                <input
                    id="passwordField"
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={value}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    className="toggle-button"
                    onClick={handleTogglePassword}
                >
                    {isPasswordVisible ? 'Hide' : 'Show'}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
