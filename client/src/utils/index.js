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

export const formatPhone = (phoneNumber) => {
    // Removes non-numeric characters
    let formattedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Check if the first character is '0' and remove it
    if (formattedPhoneNumber.charAt(0) === '0') {
        formattedPhoneNumber = formattedPhoneNumber.slice(1);
    }
    formattedPhoneNumber = "972" + formattedPhoneNumber;

    return formattedPhoneNumber;
}