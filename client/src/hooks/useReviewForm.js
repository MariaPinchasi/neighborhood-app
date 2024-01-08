import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalReviewsContext } from './useGlobalReviewsContext';

const useReviewForm = () => {
    const navigate = useNavigate();
    const { serviceId } = useParams();
    const { reviewId } = useParams();
    const { handleReviewAddition, handleReviewEdit } = useGlobalReviewsContext();

    const [reviewData, setReviewData] = useState({
        title: "",
        text: "",
        rating: 0,
    });

    const [errors, setErrors] = useState({
        title: null,
        text: null,
        rating: null,

    });

    const formData = [
        {
            id: '1',
            label: 'Review Title',
            type: 'text',
            name: 'title',
            value: reviewData.title,
            error: errors.title,
        },
        {
            id: '2',
            label: 'Text',
            type: 'text',
            name: 'text',
            value: reviewData.text,
            error: errors.text,
        },
        {
            id: '3',
            label: 'Rating',
            type: 'number',
            name: 'rating',
            value: reviewData.rating,
            error: errors.rating,
        },
    ]
    const handleChange = (e) => {
        setReviewData({
            ...reviewData,
            [e.target.name]: e.target.value,
        });
        setErrors(prevState => (
            {
                ...prevState,
                [e.target.name]: null
            }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        const newErrors = {};
        if (!reviewData.title) {
            newErrors.title = "Please add a title";
            isValid = false;
        }
        if (!reviewData.text) {
            newErrors.name = "Please add some text";
            isValid = false;
        }
        if (!reviewData.rating || reviewData.rating < 1 || reviewData.rating > 10) {
            newErrors.rating = "Please add a rating between 1 and 10";
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            if (!reviewId) {
                handleReviewAddition(serviceId, reviewData);
            }
            else {
                handleReviewEdit(serviceId, reviewId, reviewData);
            }
            navigate(`/services/${serviceId}`);

        }
    };

    return {
        handleChange,
        handleSubmit,
        formData,
        setReviewData
    }
}

export default useReviewForm