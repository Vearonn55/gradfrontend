import React from 'react';
import './FooterLanguageSelector.css';

interface FooterLanguageSelectorProps {
    languages: string[];
    currentLanguage: string;
    onLanguageChange: (language: string) => void;
}

const FooterLanguageSelector: React.FC<FooterLanguageSelectorProps> = ({
                                                                           languages,
                                                                           currentLanguage,
                                                                           onLanguageChange,
                                                                       }) => {

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onLanguageChange(e.target.value);
    };

    return (
        <footer className="footer-container">
            <div className="language-selector">
                <label htmlFor="languageSelect">Language:</label>
                <select
                    id="languageSelect"
                    value={currentLanguage}
                    onChange={handleLanguageChange}
                >
                    {languages.map((lang) => (
                        <option key={lang} value={lang}>
                            {lang.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </footer>
    );
};

export default FooterLanguageSelector;
