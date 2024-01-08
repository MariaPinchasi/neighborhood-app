import { createContext, useState } from "react";
import { createReview, deleteReview, getReviews, getReview, updateReview } from "../api/api.js"
import { handleError, showToast } from "../utils/index.js";
export const AppReviewsContext = createContext();

export const AppReviewsProvider = ({ children }) => {

    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchReviews = async (serviceId) => {
        try {
            const reviewsData = await getReviews(serviceId);
            setReviews(reviewsData);
            setIsLoading(false);
        } catch (err) {
            handleError(err, 'Error while getting the reviews');
        }
    }

    const handleReviewEdit = async (serviceId, reviewId, review) => {
        try {
            await updateReview(review, reviewId);
            showToast('Review successfully updated');
            fetchReviews(serviceId);
        } catch (err) {
            handleError(err, "Error while updating the review");
        }
    };
    const handleReviewDeletion = async (serviceId, reviewId) => {
        try {
            await deleteReview(reviewId);
            showToast('Review successfully deleted');
            fetchReviews(serviceId);
        } catch (err) {
            handleError(err, "Error while deleting the review");
        }
    };
    const handleReviewAddition = async (serviceId, review) => {
        try {
            await createReview(serviceId, review);
            showToast('review successfully added');
            fetchReviews(serviceId);
        } catch (err) {
            handleError(err, "Error while adding the review");
        }
    };

    return (
        <AppReviewsContext.Provider
            value={{
                isLoading,
                reviews,
                fetchReviews,
                getReview,
                handleReviewAddition,
                handleReviewDeletion,
                handleReviewEdit
            }}>
            {children}
        </AppReviewsContext.Provider>
    )
}