import React from 'react'
import { Link } from "react-router-dom"
import useAuthForm from '../hooks/useAuthForm';
import Form from '../components/Form';
import homeImg from '../../public/home.png'
import { useGlobalUserContext } from '../hooks/useGlobalUserContext';

const Home = () => {
    const { handleChange, handleSubmit, formDataLog } = useAuthForm('login');
    const { user } = useGlobalUserContext();

    return (
        <div className='show-case'>
            <img src={homeImg} alt='home-img' />
            {!user ? <section className="form-container">
                <h1>JOIN YOUR NEIGHBORHOOD</h1>
                <Form handleChange={handleChange} handleSubmit={handleSubmit} btnText='Log In' formData={formDataLog} />
                <p className="login-info">New here? <Link
                    to='/register'
                    className='register'>
                    Start here
                </Link></p>
            </section>
                :
                <section className="form-container">
                    <h1>{`${user.name.toUpperCase()}, `}WELCOME TO YOUR NEIGHBORHOOD</h1>
                </section>}

        </div>
    )
}

export default Home