import React, { useEffect, useState } from 'react'
import { useGlobalUserContext } from '../hooks/useGlobalUserContext';
import DeleteModal from './DeleteModal';
import { useGlobalServicesContext } from '../hooks/useGlobalServicesContext';

const ManageUsers = () => {
    const { fetchUsers, isLoading, users, handleUserDeletion } = useGlobalUserContext();
    const { deleteModal, setDeleteModal } = useGlobalServicesContext();

    const [deleteId, setDeleteId] = useState();

    const handleDelete = (id) => {
        setDeleteModal(true);
        setDeleteId(id);
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    if (isLoading) {
        return (
            <div className='loading'></div>
        );
    }
    return (
        <div className='services-list'>
            <h1>Users</h1>
            {users?.map(user => {
                const { _id, name, email, location } = user;

                return (
                    <div key={_id} className='user-card'>
                        <h2>{name}</h2>
                        <h3>{email}</h3>
                        <h3>{`${location.city}, ${location.neighborhood}`}</h3>
                        <button className='btn-wide bg-red' onClick={() => { handleDelete(_id) }}>Delete User</button>
                    </div>
                )
            })}
            {deleteModal && <DeleteModal id={deleteId} deleteFunction={handleUserDeletion} />}
        </div>
    )
}

export default ManageUsers