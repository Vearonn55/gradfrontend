import React from 'react';
import './TableOfUsers.css';

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

interface TableOfUsersProps {
    users: User[];
    onSelectUser: (userId: number) => void;
    // Tablodaki satıra tıklanınca kullanıcıyı seçebilir veya düzenleyebilirsiniz
}

const TableOfUsers: React.FC<TableOfUsersProps> = ({ users, onSelectUser }) => {
    return (
        <table className="users-table">
            <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id} onClick={() => onSelectUser(user.id)}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TableOfUsers;
