import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGlobalServicesContext } from '../hooks/useGlobalServicesContext';
import { useGlobalReviewsContext } from '../hooks/useGlobalReviewsContext';
import { FaPhone, FaRegHeart, FaHeart, FaWhatsapp } from 'react-icons/fa';
import { useGlobalUserContext } from '../hooks/useGlobalUserContext';
import DeleteModal from '../components/DeleteModal';

const Service = () => {
    const navigate = useNavigate();
    const { serviceId } = useParams();
    const { fetchService, service, deleteModal, setDeleteModal, handleServiceDeletion } = useGlobalServicesContext();
    const { user, handleFavoriteAddition, handleFavoriteDeletion } = useGlobalUserContext();
    const { isLoading, fetchReviews, reviews, handleReviewDeletion } = useGlobalReviewsContext();

    let canGiveReview = true;
    useEffect(() => {
        fetchService(serviceId);
    }, [serviceId]);

    useEffect(() => {
        fetchReviews(serviceId);
    }, [serviceId]);

    const { service: serviceType, name, description, phone, photo, averageRating, user: serviceUser } = service;

    const [isFavorite, setIsFavorite] = useState(user?.favorites.includes(serviceId));

    const handleWhatsAppClick = (phoneNumber) => {
        const whatsappLink = `whatsapp://send?phone=${phoneNumber}`;
        window.location.href = whatsappLink;
    };

    const handleFavorite = () => {
        if (isFavorite) {
            setIsFavorite(false);
            handleFavoriteDeletion(serviceId);
        }
        else {
            setIsFavorite(true);
            handleFavoriteAddition(serviceId);
        }
    }
    const handleDelete = () => {
        setDeleteModal(true);
    };
    if (serviceUser === user?._id) {
        canGiveReview = false;
    }
    if (isLoading) {
        return (
            <div className='loading'></div>
        );
    }
    return (
        <div className='services-list'>
            <article className='service-card'>
                <img alt='service img' src={`${import.meta.env.VITE_BASE_URL}/uploads/${photo}`} />
                <div className='service-content'>
                    <h3 className='service-label'>{`${serviceType}`}</h3>
                    <h2>{`${name}`}</h2>
                    <h3><FaPhone />{` ${phone}`}</h3>
                    <button className='btn-whatsapp' onClick={() => { handleWhatsAppClick(phone) }}><FaWhatsapp /> Send a message</button>
                    <p>{`${description}`}</p>
                    <h3 className={averageRating ? 'rating' : ''}>{averageRating ? averageRating : "No Reviews"}</h3>
                </div>
                <button className='btn-star' onClick={handleFavorite}>{isFavorite ? <FaHeart /> : <FaRegHeart />}</button>
            </article>
            {user?.role === 'admin' && <button className='btn-wide bg-red' onClick={handleDelete}>Delete Service</button>}
            {deleteModal && <DeleteModal id={serviceId} deleteFunction={handleServiceDeletion} navigate={navigate} />}
            <div className='reviews'>
                <h1>Reviews</h1>
                {reviews?.map(review => {
                    const { _id, title, text, rating, user: reviewUser } = review;
                    if (reviewUser._id === user?._id) {
                        canGiveReview = false;
                    }
                    return (
                        <article className='review' key={_id}>
                            <h2>{title}</h2>
                            <h3 className='rating'>{`${rating}/10`}</h3>
                            <p>{text}</p>
                            <h4>{reviewUser.name}</h4>
                            {reviewUser._id === user?._id && <Link to={`reviews/${_id}`} className="btn-wide bg-primary">Edit Review</Link>}
                            {(reviewUser._id === user?._id || user?.role === 'admin') &&
                                <button className='btn-wide bg-red' onClick={() => { handleReviewDeletion(serviceId, _id) }}>Delete Review</button>}
                        </article>
                    )
                })}
                {reviews.length === 0 && <p>No Reviews</p>}
            </div>
            {canGiveReview && <Link to={`addReview`} className="btn-primary"> Add a Review</Link>}
        </div>

    )
}

export default Service