import React from 'react'
import { Link } from "react-router-dom"
import { FaPhone } from 'react-icons/fa';

const ServiceCard = ({ _id, service, name, description, phone, photo, averageRating }) => {
    return (
        <Link to={`/services/${_id}`} className='service-card'>
            <img alt='service img' src={photo} />
            <div className='service-content'>
                <h3 className='service-label'>{`${service}`}</h3>
                <h2>{`${name}`}</h2>
                <h3><FaPhone />{` ${phone}`}</h3>
                <p>{description.length > 100 ? `${description.split(' ').slice(0, 20).join(' ')}...` : `${description}`}</p>
                <h3>{`Average Rating: ${averageRating ? averageRating : "No Reviews"}`}</h3>
            </div>
        </Link>
    )
}

export default ServiceCard