import React, { useEffect, useState } from 'react'
import { getAllLocations } from '../api/api';

const SelectLocation = ({ handleChange, errors }) => {
    const [locations, setLocations] = useState([]);
    const fetchLocations = async () => {
        try {
            const locationsData = await getAllLocations();
            setLocations(locationsData);
        } catch (err) {
            console.log(err, 'Error while getting the locations');
        }
    }

    useEffect(() => {
        fetchLocations();
    }, []);
    return (
        <div className="input-group">
            <select name="location" defaultValue='Select Your Neighborhood' onChange={handleChange}>
                <option value="Select Your Neighborhood">{'Select Your Neighborhood'}</option>
                {locations.map(location => {
                    const { _id, city, neighborhood } = location;
                    return (
                        <option key={_id} value={_id}>{`${city}, ${neighborhood}`}</option>)
                })}
            </select>
            <div className="error-message">{errors.location}</div>
        </div>

    )
}

export default SelectLocation