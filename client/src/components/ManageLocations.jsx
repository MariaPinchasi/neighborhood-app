import React, { useEffect } from 'react'
import { useGlobalUserContext } from '../hooks/useGlobalUserContext';
import { Link } from 'react-router-dom';

const ManageLocations = () => {
    const { fetchLocations, locations } = useGlobalUserContext();

    useEffect(() => {
        fetchLocations();
    }, []);

    return (
        <div className='services-list'>
            <h1>Locations</h1>
            <Link to={`/addLocation`} className="btn-wide"> Add a Location</Link>
            {locations?.map(location => {
                const { _id, city, neighborhood } = location;

                return (
                    <div key={_id} className='user-card'>
                        <h2>{city}</h2>
                        <h3>{neighborhood}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default ManageLocations