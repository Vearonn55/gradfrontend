import React, { useState } from "react";
import HelpSearchBar from "./HelpSearchBar";
import TutorialList, { TutorialItem } from "./TutorialList";
import ContactSupportButton from "./ContactSupportButton";
import "./HelpCenterPage.css";
import { API_BASE_URL } from '../../config';


const HelpCenterPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // Örnek eğitim içerikleri
    const tutorials: TutorialItem[] = [
        { id: 1, title: "Getting Started", description: "Learn how to set up your account and navigate the platform.", videoUrl: "https://www.youtube.com/watch?v=example" },
        { id: 2, title: "Managing Inventory", description: "A step-by-step guide to manage your inventory efficiently." },
        { id: 3, title: "Pricing Strategies", description: "Tips on setting the best prices for your products.", videoUrl: "https://www.youtube.com/watch?v=example2" }
    ];

    // Arama fonksiyonu
    const handleSearch = (query: string) => {
        setSearchQuery(query.toLowerCase());
    };

    // Filtrelenmiş eğitimler
    const filteredTutorials = tutorials.filter(
        (tutorial) => tutorial.title.toLowerCase().includes(searchQuery) || tutorial.description.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="help-center-container">
            <h2>Help Center</h2>
            <HelpSearchBar onSearch={handleSearch} />
            <TutorialList tutorials={filteredTutorials} />
            <ContactSupportButton supportEmail="support@example.com" />
        </div>
    );
};

export default HelpCenterPage;
