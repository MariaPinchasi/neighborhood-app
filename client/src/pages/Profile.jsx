import React, { useState } from 'react'
import { useGlobalUserContext } from '../hooks/useGlobalUserContext';
import MyServices from '../components/MyServices';
import MyFavorites from '../components/MyFavorites';
import { useGlobalServicesContext } from '../hooks/useGlobalServicesContext';
import ImageUpload from '../components/ImageUpload';

const viewOptions = ['My Services', 'My Favorites'];

const Profile = () => {
    const { user } = useGlobalUserContext();
    const [current, setCurrent] = useState(viewOptions[0]);
    const { modalServiceId } = useGlobalServicesContext();

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
            {current === 'My Services' && <ImageUpload serviceId={modalServiceId} />}


            {current === 'My Favorites' && <MyFavorites />}
        </main>
    )
}

export default Profile