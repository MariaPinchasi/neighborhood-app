import React, { useEffect } from 'react'
import useServiceForm from '../hooks/useServiceForm';
import Form from '../components/Form';
import { useParams } from 'react-router-dom';
import { getService } from '../api/api';
import { handleError } from '../utils';

const ServiceForm = () => {
    const { serviceId } = useParams();
    const { handleChange, handleSubmit, formData, setServiceData, errors, handleServiceChange } = useServiceForm();
    const btnText = serviceId ? 'Edit Service' : 'Add Service';

    const fetchService = async (serviceId) => {
        if (serviceId) {
            try {
                const serviceData = await getService(serviceId);
                setServiceData(serviceData);
            } catch (err) {
                handleError(err, `Error while getting the service with id ${serviceId}`);
            }
        }
    }

    useEffect(() => {
        fetchService(serviceId);
    }, [serviceId]);

    return (
        <section className='form-container'>
            <h2>My Service</h2>
            <Form handleChange={handleChange} handleSubmit={handleSubmit} btnText={btnText} formData={formData} formType='register' errors={errors} handleServiceChange={handleServiceChange} />
        </section>
    )
}

export default ServiceForm