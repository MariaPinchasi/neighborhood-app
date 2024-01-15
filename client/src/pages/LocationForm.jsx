import React, { useState } from 'react'
import { useGlobalUserContext } from '../hooks/useGlobalUserContext';

const LocationForm = () => {
    const { handleLocationAddition } = useGlobalUserContext();

    const [locationData, setLocationData] = useState({
        city: "",
        neighborhood: "",
    });

    const [errors, setErrors] = useState({
        city: null,
        neighborhood: null,
    });

    const handleChange = (e) => {
        setLocationData({
            ...locationData,
            [e.target.name]: e.target.value,
        });
        setErrors(prevState => (
            {
                ...prevState,
                [e.target.name]: null
            }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        const newErrors = {};
        if (!locationData.city) {
            newErrors.service = "Please add a city";
            isValid = false;
        }
        if (!locationData.neighborhood) {
            newErrors.description = "Please add a neighborhood";
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            handleLocationAddition(locationData);
        }
    };

    return (
        <div className='form-container'>
            <h1>Add a Location</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="text" name="city" placeholder="city" value={locationData.city} onChange={handleChange} />
                    <div className="error-message">{errors.city}</div>
                </div>
                <div className="input-group">
                    <input type="text" name="neighborhood" placeholder="neighborhood" value={locationData.neighborhood} onChange={handleChange} />
                    <div className="error-message">{errors.neighborhood}</div>
                </div>
                <button className="btn-secondary" type="submit">Add Location</button>
            </form>
        </div>


    )
}

export default LocationForm