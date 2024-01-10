import React, { useEffect } from 'react'
import { useGlobalServicesContext } from '../hooks/useGlobalServicesContext';
import ServiceCard from './ServiceCard';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';

const MyServices = () => {
    const { fetchUserServices, userServices, isLoading, openModal, handleServiceDeletion, modalServiceId } = useGlobalServicesContext();

    useEffect(() => {
        fetchUserServices();
    }, []);

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
                        <Link to={`/services/${singleService._id}/editService`} className="btn-wide bg-primary"> Edit Service</Link>
                        <button onClick={() => { openModal(singleService._id) }} className="btn-wide bg-secondary"> Upload Image</button>
                        <button className='btn-wide bg-red' onClick={() => { handleServiceDeletion(singleService._id) }}>Delete Service</button>

                    </div>
                )
            })}
            <ImageUpload serviceId={modalServiceId} />

        </div>
    )
}

export default MyServices