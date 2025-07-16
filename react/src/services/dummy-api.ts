const LOGIN_URL = 'https://dummyjson.com/auth/login';
const SIGNUP_URL = 'https://dummyjson.com/users/add';

export const loginUser = async (
    username: string,
    password: string
): Promise<{
    accessToken: string;
}> => {
    try {
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, expiresInMins: 30 })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data: {
            accessToken: string;
        } = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const signUpUser = async (
    email: string,
    password: string
): Promise<{ id: string; email: string }> => {
    try {
        const response = await fetch(SIGNUP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Failed to sign up');
        }

        const data: { id: string; email: string } = await response.json();
        return data;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

export const resetPassword = async (
    email: string,
    password: string
): Promise<{ success: boolean }> => {
    try {
        const response = await fetch(SIGNUP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Failed to reset password');
        }

        const data: { success: boolean } = await response.json();
        return data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
};
