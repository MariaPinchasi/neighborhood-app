import React from 'react'
import { useGlobalServicesContext } from '../hooks/useGlobalServicesContext';

const DeleteModal = ({ id, deleteFunction, navigate }) => {
    const { deleteModal, setDeleteModal } = useGlobalServicesContext();

    return (
        <div className={deleteModal ? 'modal-overlay show-modal' : 'modal-overlay'}>
            <div className='modal-container delete'>
                <h1>Are You Sure?</h1>
                <button className='btn-primary' onClick={() => {
                    setDeleteModal(false);
                }}>No</button>
                <button className='btn-primary bg-red' onClick={() => {
                    setDeleteModal(false);
                    deleteFunction(id);
                    if (navigate) {
                        navigate('/search');
                    }
                }}>Yes</button>
            </div>
        </div>
    )
}

export default DeleteModal