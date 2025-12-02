import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/user/userSlice';
import { authKey } from '@/constants/auth';

const useAuth = () => {
    const dispatch = useDispatch();
    const [isUser, setIsUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get(authKey);
        const userCookie = Cookies.get('user');

        if (token && userCookie) {
            try {
                const userData = JSON.parse(userCookie);
                setIsUser(userData);
                dispatch(setUser(userData));
            } catch (error) {
                console.error('Error parsing user cookie:', error);
                Cookies.remove(authKey);
                Cookies.remove('user');
            }
        }
        setLoading(false);
    }, [dispatch]);

    return { isUser, setIsUser, loading };
};

export default useAuth;
