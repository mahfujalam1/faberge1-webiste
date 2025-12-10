import { authKey } from '@/constants/auth';
import Cookies from 'js-cookie';

export const currentUser = () => {
    const userCookie = Cookies.get(authKey);

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


// Format date
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Get status badge color
export const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed':
            return 'bg-green-500 text-white';
        case 'booked':
            return 'bg-orange-200 text-yellow-700';
        case 'cancelled':
            return 'bg-red-500 text-white';
        default:
            return 'bg-gray-500 text-white';
    }
};