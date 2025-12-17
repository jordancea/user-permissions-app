const BASE_URL = 'http://localhost:4000/api';


export const urls = {
    login: `${BASE_URL}/auth/login`,
    me: `${BASE_URL}/auth/me`,
    logout: `${BASE_URL}/auth/logout`,
    roles: `${BASE_URL}/roles`,
    updatePermissions: (id: number) => `${BASE_URL}/roles/${id}`,
    users: `${BASE_URL}/users`,
    createUser: `${BASE_URL}/users`,
    updateUser: (id: number) => `${BASE_URL}/users/${id}`,
    deleteUser: (id: number) => `${BASE_URL}/users/${id}`,

};
