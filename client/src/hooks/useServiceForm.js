import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalServicesContext } from './useGlobalServicesContext';

const useServiceForm = () => {
    const navigate = useNavigate();
    const { serviceId } = useParams();
    const { handleServiceAddition, handleServiceEdit } = useGlobalServicesContext();

    const [serviceData, setServiceData] = useState({
        service: "",
        description: "",
        phone: "",
        photo: "",
    });

    const [errors, setErrors] = useState({
        service: null,
        description: null,
        phone: null,
        photo: null,
    });

    const formData = [
        {
            id: '1',
            label: 'Description',
            type: 'text',
            name: 'description',
            value: serviceData.description,
            error: errors.description,
        },
        {
            id: '2',
            label: 'Phone',
            type: 'text',
            name: 'phone',
            value: serviceData.phone,
            error: errors.phone,
        },
        {
            id: '3',
            label: 'Photo',
            type: 'text',
            name: 'photo',
            value: serviceData.photo,
            error: errors.photo,
        },
    ]
    const handleChange = (e) => {
        setServiceData({
            ...serviceData,
            [e.target.name]: e.target.value,
        });
        setErrors(prevState => (
            {
                ...prevState,
                [e.target.name]: null
            }));
    };
    const handleServiceChange = (selected) => {
        setServiceData({
            ...serviceData,
            service: selected.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        const newErrors = {};
        if (serviceData.service === 'All Services' || !serviceData.service) {
            newErrors.service = "Please select a service";
            isValid = false;
        }
        if (!serviceData.description) {
            newErrors.description = "Please add a description";
            isValid = false;
        }
        if (serviceData.description.length > 500) {
            newErrors.description = "Description can't be longer than 500 characters";
            isValid = false;
        }
        if (!serviceData.phone || serviceData.phone < 10 || serviceData.phone > 12) {
            newErrors.phone = "Please add a phone between 10 and 12 integers";
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            if (!serviceId) {
                handleServiceAddition(serviceData);
            }
            else {
                handleServiceEdit(serviceData, serviceId);
            }
            navigate(`/profile`);
        }
    };

    return {
        handleChange,
        handleServiceChange,
        handleSubmit,
        formData,
        setServiceData,
        errors
    }
}

export default useServiceForm