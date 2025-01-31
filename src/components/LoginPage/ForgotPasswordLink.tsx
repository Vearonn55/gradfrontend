import React from "react";
import './ForgotPasswordLink.css';

interface ForgotPasswordLinkProps {
    onClick?: () => void;
}

const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({ onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div className="forgot-password-container">
            <a onClick={handleClick}>Forgot Password?</a>
        </div>
    );
};

export default ForgotPasswordLink;
