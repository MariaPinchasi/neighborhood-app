import React, { useEffect, useState } from 'react'
import { useGlobalServicesContext } from '../hooks/useGlobalServicesContext';
import ServiceCard from './ServiceCard';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import DeleteModal from './DeleteModal';

const MyServices = () => {
    const { fetchUserServices, userServices, isLoading, openModal, setDeleteModal, deleteModal, modalServiceId } = useGlobalServicesContext();
    const [deleteId, setDeleteId] = useState();
    useEffect(() => {
        fetchUserServices();
    }, []);

    const handleDelete = (id) => {
        setDeleteModal(true);
        setDeleteId(id);
    };

    if (isLoading) {
        return (
            <div className='loading'></div>
        );
    }
    return (
        <div className='services-list'>
            <h1>My Services</h1>
            <Link to={`/services/addService`} className="btn-wide"> Add a Service</Link>
            {userServices.length === 0 && <p className='empty-message'>No published services yet</p>}
            {userServices.map(singleService => {
                return (
                    <div key={singleService._id}>
                        <ServiceCard {...singleService} />
                        <Link to={`/services/${singleService._id}/editService`} className="btn-wide bg-primary"> Edit Service</Link>
                        <button onClick={() => { openModal(singleService._id) }} className="btn-wide bg-secondary"> Upload Image</button>
                        <button className='btn-wide bg-red' onClick={() => { handleDelete(singleService._id) }}>Delete Service</button>

                    </div>
                )
            })}
            {deleteModal && <DeleteModal id={deleteId} />}
            <ImageUpload serviceId={modalServiceId} />

        </div>
    )
}

export default MyServices