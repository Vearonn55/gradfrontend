import React, { useState } from 'react';
import './AddUserModal.css';

interface NewUserData {
    username: string;
    email: string;
    role: string;
}

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddUser: (userData: NewUserData) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAddUser }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('User');

    if (!isOpen) return null; // Modal açık değilse hiçbir şey renderlama

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Formdan gelen veriler
        const newUser: NewUserData = { username, email, role };
        onAddUser(newUser);

        // formu temizleyip kapatalım
        setUsername('');
        setEmail('');
        setRole('User');
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Add New User</h3>
                <form onSubmit={handleSubmit} className="add-user-form">
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Role:</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                            {/* Diğer roller buraya eklenebilir */}
                        </select>
                    </div>

                    <div className="modal-buttons">
                        <button type="submit">Add</button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;
