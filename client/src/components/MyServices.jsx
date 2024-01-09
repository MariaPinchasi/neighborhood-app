import React, { useEffect } from 'react'
import { useGlobalServicesContext } from '../hooks/useGlobalServicesContext';
import ServiceCard from './ServiceCard';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';

const MyServices = () => {
    const { fetchUserServices, userServices, isLoading, openModal, modalServiceId } = useGlobalServicesContext();

    useEffect(() => {
        fetchUserServices();
    }, [userServices]);

    if (isLoading) {
        return (
            <div className='loading'></div>
        );
    }
    return (
        <div className='services-list'>
            <h1>My Services</h1>
            <Link to={`/services/addService`} className="btn-wide"> Add a Service</Link>

            {userServices.map(singleService => {
                return (
                    <div key={singleService._id}>
                        <ServiceCard {...singleService} />
                        <Link to={`/services/${singleService._id}/editService`} className="btn-primary"> Edit Service</Link>
                        <button onClick={() => { openModal(singleService._id) }} className="btn-primary"> Upload Image</button>
                    </div>
                )
            })}
        </div>
    )
}

export default MyServices