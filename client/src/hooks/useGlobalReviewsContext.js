import { useContext } from "react";
import { AppReviewsContext } from '../context/reviewsContext.jsx'
export const useGlobalReviewsContext = () => {
    return useContext(AppReviewsContext);
}