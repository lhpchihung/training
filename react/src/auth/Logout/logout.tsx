import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast } from '../../utils/toastUtils';
import { AuthenticatedContext } from '../../shared/Authenticated';

const Logout = () => {
    const { setUser } = useContext(AuthenticatedContext);
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('user');
        setUser(null);
        navigate('/auth/login');
        showSuccessToast('Logout successfully!');
    }, []);

    return null;
};

export default Logout;
