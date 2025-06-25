import { UserData } from '../pages/user/personal-information/model';

export const fetchUserData = async (): Promise<UserData | null> => {
    try {
        const localData = localStorage.getItem('userData');
        return localData ? (JSON.parse(localData) as UserData) : null;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const updateUserData = async (updatedData: UserData): Promise<void> => {
    try {
        localStorage.setItem('userData', JSON.stringify(updatedData));
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
};
