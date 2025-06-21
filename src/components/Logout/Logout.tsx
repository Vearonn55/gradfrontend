import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Logout.css";
import { API_BASE_URL } from '../../config';

interface LogoutProps {
    onLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
    return (
        <button className="logout-button" onClick={onLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
            <span>Logout</span>
        </button>
    );
};

export default Logout;
