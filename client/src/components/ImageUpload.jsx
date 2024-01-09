import React, { useEffect, useState } from 'react'
import { useGlobalServicesContext } from '../hooks/useGlobalServicesContext';
import { FaTimes } from 'react-icons/fa';

const ImageUpload = ({ serviceId }) => {
    const { fetchService, service, handleImageUpload, isModalOpen, closeModal } = useGlobalServicesContext();
    const [imagePreview, setImagePreview] = useState();
    const [file, setFile] = useState()

    useEffect(() => {
        if (serviceId) {
            fetchService(serviceId);
        }
    }, [serviceId]);

    const imageData = service.photo;
    const currentImg = imageData ? `${import.meta.env.VITE_BASE_URL}/uploads/${imageData}` : `${import.meta.env.VITE_BASE_URL}/uploads/no-photo.jpg`;

    const handlePhotoUpload = (e) => {
        setFile(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
    const handlePhotoSubmit = (e) => {
        e.preventDefault();
        handleImageUpload(serviceId, { file });
        closeModal();
    }
    return (
        <div className={isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}>
            <div className='modal-container'>
                <form onSubmit={handlePhotoSubmit} className='image-input'>
                    <h1>Please Add an Image</h1>
                    <img alt='service-img' src={imagePreview ? imagePreview : currentImg} />
                    <input type='file' className='input-file' onChange={handlePhotoUpload} />
                    <button className="btn-primary" type="submit">Upload Image</button>
                </form>
                <button className='close-modal-btn' onClick={closeModal}>
                    <FaTimes />
                </button>
            </div>
        </div>

    )
}

export default ImageUpload