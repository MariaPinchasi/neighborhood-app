import React, { useEffect } from 'react'
import useReviewForm from '../hooks/useReviewForm';
import Form from '../components/Form';
import { useParams } from 'react-router-dom';
import { getReview } from '../api/api';
import { handleError } from '../utils';

const ReviewForm = () => {
    const { reviewId } = useParams();
    const { handleChange, handleSubmit, formData, setReviewData } = useReviewForm();
    const btnText = reviewId ? 'Edit Review' : 'Add Review';
    
    const fetchReview = async (reviewId) => {
        if (reviewId) {
            try {
                const reviewData = await getReview(reviewId);
                setReviewData(reviewData);
            } catch (err) {
                handleError(err, `Error while getting the review with id ${reviewId}`);
            }
        }
    }

    useEffect(() => {
        fetchReview(reviewId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reviewId]);

    return (
        <section className='form-container'>
            <h2>My Review</h2>
            <Form handleChange={handleChange} handleSubmit={handleSubmit} btnText={btnText} formData={formData} />
        </section>
    )
}

export default ReviewForm