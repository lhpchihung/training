export const buildUserPath = (userId: string, subPath: 'pi' | 'kyc') => {
    const currentUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    const isAdmin = currentUser.role === 'admin';
    return isAdmin ? `/pages/admin/${userId}/${subPath}` : `/pages/user/${userId}/${subPath}`;
};
