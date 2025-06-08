import React from 'react';


interface ContactSupportButtonProps {
    supportEmail: string;
}

const ContactSupportButton: React.FC<ContactSupportButtonProps> = ({ supportEmail }) => {
    const handleContactSupport = () => {
        // Örnek: mailto linki
        window.location.href = `mailto:${supportEmail}?subject=Need Help&body=Hello, I need help with...`;
    };

    return (
        <button className="contact-support-btn" onClick={handleContactSupport}>
            Contact Support
        </button>
    );
};

export default ContactSupportButton;
