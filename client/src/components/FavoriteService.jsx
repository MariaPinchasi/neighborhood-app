import React, { useEffect, useState } from 'react'
import ServiceCard from './ServiceCard';
import { getService } from '../api/api';
import { handleError } from '../utils';
import { useGlobalUserContext } from '../hooks/useGlobalUserContext';

const FavoriteService = ({ serviceId }) => {
    const { handleFavoriteDeletion } = useGlobalUserContext();

    const [service, setService] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const fetchService = async (serviceId) => {
        try {
            const serviceData = await getService(serviceId);
            setService(serviceData);
        } catch (err) {
            handleError(err, `Error while getting the service with id ${serviceId}`);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchService(serviceId);
    }, [serviceId]);
    if (isLoading) {
        return (
            <div className='loading'></div>
        );
    }

    return (
        <div>
            {!service.name &&
                <div className='service-card'>
                    <p className='empty-message'>{`Service ${serviceId} was deleted `}</p>
                    <button className='btn-primary bg-red' onClick={() => { handleFavoriteDeletion(serviceId) }}>Delete From my Favorites</button>
                </div>}
            {
                service.name && <ServiceCard key={service._id} {...service} />
            }
        </div>
    )


}

export default FavoriteService
