import React from 'react'
import useAuthForm from '../hooks/useAuthForm';
import Form from '../components/Form';

const Register = () => {
    const { handleChange, handleSubmit, formDataReg, errors } = useAuthForm();

    return (
        <section className='form-container'>
            <h2>Register</h2>
            <Form handleChange={handleChange} handleSubmit={handleSubmit} btnText='Register' formData={formDataReg} errors={errors} />
        </section>
    )
}

export default Register