import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message, type = 'success') => {
    toast[type](message, {
        position: toast.POSITION.TOP_CENTER,
    });
};
export const handleError = (err, message) => {
    showToast(err.response?.data?.error || message, 'error');
    console.error((err.response?.data?.error || message));
};