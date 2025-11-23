import Cookies from 'js-cookie';

export const currentUser = () => {
    const userCookie = Cookies.get('user');

    if (!userCookie) {
        return null;
    }

    try {
        return JSON.parse(userCookie);
    } catch (err) {
        console.error('Failed to parse user cookie:', err);
        return null;
    }
};