import React from 'react';
import './EmailUsernameInput.css';

interface EmailUsernameInputProps {
    value: string;
    onChange: (newValue: string) => void;
}

const EmailUsernameInput: React.FC<EmailUsernameInputProps> = ({ value, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="email-username-container">
            <label htmlFor="emailUsername">Email / Username</label>
            <input
                type="text"
                id="emailUsername"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default EmailUsernameInput;
