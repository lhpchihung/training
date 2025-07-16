import { User } from '../pages/user/personal-information/model';

const API_URL = 'http://localhost:3001/users';

// Check if user exists by email
export const isUserExist = async (email: string): Promise<boolean> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch users');

    const data = await response.json();

    return data.some((user: any) => user.email === email);
};

// Save user to json-server
export const saveUserToServer = async (user: User): Promise<User> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error('Failed to save user');
    }

    return await response.json();
};

// Fetch user from sessionStorage then get full data from server
export const fetchUserData = async (): Promise<User> => {
    const userStr = sessionStorage.getItem('user');
    if (!userStr) throw new Error('User not found in session');

    const user = JSON.parse(userStr);
    const response = await fetch(`${API_URL}/${user.id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    return await response.json();
};

// Fetch user by ID
export const fetchUserDataById = async (id: string): Promise<User> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    return await response.json();
};

// Update user data
export const updateUserData = async (user: User): Promise<void> => {
    if (!user.id) throw new Error('User ID is required');

    const response = await fetch(`${API_URL}/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error('Failed to update user data');
    }
};
