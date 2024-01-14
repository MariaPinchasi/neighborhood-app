import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL = `${BASE_URL}/api/v1`;
const API = axios.create({
    URL,
    withCredentials: true
});

export const getAllLocations = async () => {
    const res = await API.get(`${URL}/locations`);
    return res.data.data;
}

// services
export const getAllServices = async (query) => {
    let res;
    if (query && query !== "All Services") {
        res = await API.get(`${URL}/services?service=${query}`);
    }
    else {
        res = await API.get(`${URL}/services`);
    }
    return res.data.data;
}

export const getUserServices = async () => {
    const res = await API.get(`${URL}/services/userServices`);
    return res.data.data;
}

export const getService = async (serviceId) => {
    const res = await API.get(`${URL}/services/${serviceId}`);
    return res.data.data;
}

export const updateService = async (service, serviceId) => {
    await API.put(`${URL}/services/${serviceId}`, service);
}
export const uploadServiceImg = async (serviceId, file) => {
    await API.put(`${URL}/services/${serviceId}/photo`, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const createService = async (service) => {
    await API.post(`${URL}/services`, service);
}

export const deleteService = async (serviceId) => {
    await API.delete(`${URL}/services/${serviceId}`);
}


// reviews
export const getReviews = async (serviceId) => {
    const res = await API.get(`${URL}/services/${serviceId}/reviews`);
    return res.data.data;
}

export const createReview = async (serviceId, review) => {
    await API.post(`${URL}/services/${serviceId}/reviews`, review);
}

export const getReview = async (reviewId) => {
    const res = await API.get(`${URL}/reviews/${reviewId}`);
    return res.data.data;
}

export const updateReview = async (review, reviewId) => {
    await API.put(`${URL}/reviews/${reviewId}`, review);
}

export const deleteReview = async (reviewId) => {
    await API.delete(`${URL}/reviews/${reviewId}`);
}

// user
export const registerUser = async (userData) => {
    const res = await API.post(`${URL}/auth/register`, userData);
    return res.data.user;
}

export const loginUser = async (email, password) => {
    const res = await API.post(`${URL}/auth/login`, { email, password });
    return res.data.user;

}

export const logoutUser = async () => {
    await API.put(`${URL}/auth/logout`);
}

export const getUser = async () => {
    const res = await API.get(`${URL}/auth/currentUser`);
    return res.data.data;

}
// users
export const getUsers = async () => {
    const res = await API.get(`${URL}/users`);
    return res.data.data;
}
export const deleteUser = async (userId) => {
    await API.delete(`${URL}/users/${userId}`);
}
export const addToFavorite = async (id) => {
    await API.put(`${URL}/users/addFavorites`, { id });
}

export const deleteFromFavorite = async (id) => {
    await API.put(`${URL}/users/removeFavorites`, { id });
}