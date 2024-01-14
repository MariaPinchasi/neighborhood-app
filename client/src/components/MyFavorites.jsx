import React from 'react'
import { useGlobalUserContext } from '../hooks/useGlobalUserContext';
import FavoriteService from './FavoriteService';

const MyFavorites = () => {
    const { user } = useGlobalUserContext();
    return (
        <div className='services-list'>
            <h1>My Favorites</h1>
            {user.favorites.length === 0 && <p className='empty-message'>No favorite services yet</p>}
            {user.favorites.map((serviceId, index) => {
                return (
                    <FavoriteService key={index} serviceId={serviceId} />
                )
            })}
        </div>
    )
}

export default MyFavorites
