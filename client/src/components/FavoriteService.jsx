import React, { useEffect, useState } from 'react'
import ServiceCard from './ServiceCard';
import { getService } from '../api/api';
import { handleError } from '../utils';

const FavoriteService = ({ serviceId }) => {

    const [service, setService] = useState({});
    // const [isLoading, setIsLoading] = useState(true);
    const fetchService = async (serviceId) => {
        try {
            const serviceData = await getService(serviceId);
            setService(serviceData);
            // setIsLoading(false);
        } catch (err) {
            handleError(err, `Error while getting the service with id ${serviceId}`);
        }
    }

    useEffect(() => {
        fetchService(serviceId);
    }, [serviceId]);
    // if (isLoading) {
    //     return (
    //         <div className='loading'></div>
    //     );
    // }

    return (
        <div>
            {
                service.name && <ServiceCard key={service._id} {...service} />
            }
        </div>
    )


}

export default FavoriteService
