import React from 'react';
import './LoginButton.css';

interface LoginButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick, disabled }) => {
    return (
        <button className="login-button" onClick={onClick} disabled={disabled}>
            Login
        </button>
    );
};

export default LoginButton;
