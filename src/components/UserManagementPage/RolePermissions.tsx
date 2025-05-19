import React from 'react';
import './RolePermissions.css';

export interface RolePermission {
    roleName: string;
    permissions: string[];
}

interface RolePermissionsProps {
    role: string;  // Seçili kullanıcının rolü
    allRoles: RolePermission[]; // Tüm roller ve izinler
    onRoleChange: (newRole: string) => void;
}

const RolePermissions: React.FC<RolePermissionsProps> = ({
                                                             role,
                                                             allRoles,
                                                             onRoleChange,
                                                         }) => {
    /**
     * `find` yerine `filter(...)[0]` kullanarak,
     * TypeScript derleyicisi / ortamı `find` metodunu tanımasa bile
     * bu şekilde seçili rolü elde edebiliriz.
     */
    const selectedRole = allRoles.filter((r) => r.roleName === role)[0];

    return (
        <div className="role-permissions-container">
            <label htmlFor="roleSelect">Role:</label>
            <select
                id="roleSelect"
                value={role}
                onChange={(e) => onRoleChange(e.target.value)}
            >
                {allRoles.map((r) => (
                    <option key={r.roleName} value={r.roleName}>
                        {r.roleName}
                    </option>
                ))}
            </select>

            <div className="permissions-list">
                <h4>Permissions for {role}</h4>
                {selectedRole && selectedRole.permissions.length > 0 ? (
                    <ul>
                        {selectedRole.permissions.map((perm) => (
                            <li key={perm}>{perm}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No permissions assigned.</p>
                )}
            </div>
        </div>
    );
};

export default RolePermissions;
