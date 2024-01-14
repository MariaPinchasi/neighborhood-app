import { createContext, useEffect, useState } from "react";
import { addToFavorite, deleteFromFavorite, deleteUser, getUser, getUsers, loginUser, logoutUser, registerUser } from "../api/api";
import { handleError, showToast } from "../utils/index.js";

export const AppUserContext = createContext();

export const AppUserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const loadUser = async () => {
        try {
            const userData = await getUser();
            setUser(userData);
        } catch (err) {
            // handleError(err, 'Error related to user details or permissions');
            setUser(null);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (email, password, navigate) => {
        try {
            const userData = await loginUser(email, password);
            setUser(userData);
            navigate('/search');
        } catch (err) {
            handleError(err, 'Error related to user login');
        }
    };

    const register = async (formData, navigate) => {
        try {
            const userData = await registerUser(formData);
            setUser(userData);
            navigate('/search');
        } catch (err) {
            handleError(err, 'Error related to user registration');
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
        } catch (err) {
            handleError(err, 'Error related to user logout');
        }
    };


    const fetchUsers = async () => {
        try {
            const usersData = await getUsers();
            setUsers(usersData);
            setIsLoading(false);
        } catch (err) {
            handleError(err, 'Error while getting the users');
        }
    };

    const handleUserDeletion = async (userId) => {
        try {
            await deleteUser(userId);
            showToast('User successfully deleted');
            fetchUsers();
        } catch (err) {
            handleError(err, "Error while deleting the user");
        }
    };

    const handleFavoriteAddition = async (serviceId) => {
        try {
            await addToFavorite(serviceId);
            loadUser();
            showToast('Service successfully added to your favorites');
        } catch (err) {
            handleError(err, 'Error related to favorite addition');
        }
    };
    const handleFavoriteDeletion = async (serviceId) => {
        try {
            await deleteFromFavorite(serviceId);
            loadUser();
            showToast('Service successfully removed from your favorites');
        } catch (err) {
            handleError(err, 'Error related to favorite deletion');
        }
    };


    return (
        <AppUserContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                fetchUsers,
                handleUserDeletion,
                handleFavoriteAddition,
                handleFavoriteDeletion
            }}>
            {children}
        </AppUserContext.Provider>
    );
}