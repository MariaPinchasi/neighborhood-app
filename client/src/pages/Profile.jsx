import React, { useState } from 'react'
import { useGlobalUserContext } from '../hooks/useGlobalUserContext';
import MyServices from '../components/MyServices';
import MyFavorites from '../components/MyFavorites';
import ManageLocations from '../components/ManageLocations';
import ManageUsers from '../components/ManageUsers';


const Profile = () => {
    const { user } = useGlobalUserContext();
    const viewOptions = user?.role === 'admin' ? ['Manage Locations', 'Manage Users'] : ['My Services', 'My Favorites'];

    const [current, setCurrent] = useState(viewOptions[0]);

    return (
        <main className='profile-container'>
            <h1>{`hello ${user?.name}`}</h1>
            <div className='btn-container'>
                {viewOptions.map((option, index) => {
                    return (
                        <button key={index} onClick={() => setCurrent(option)} className='btn-choices'>{option}</button>
                    )
                })};
            </div>
            {current === 'My Services' && <MyServices />}
            {current === 'My Favorites' && <MyFavorites />}
            {current === 'Manage Locations' && <ManageLocations />}
            {current === 'Manage Users' && <ManageUsers />}
        </main>
    )
}

export default Profile