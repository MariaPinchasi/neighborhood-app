import { createContext, useEffect, useState } from "react";
import { createService, deleteService, getAllServices, getService, getUserServices, updateService, uploadServiceImg } from "../api/api.js"
import { handleError, showToast } from "../utils/index.js";
export const AppServicesContext = createContext();

export const AppServicesProvider = ({ children }) => {

    const [services, setServices] = useState([]);
    const [userServices, setUserServices] = useState([]);
    const [service, setService] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalServiceId, setModalServiceId] = useState();

    const openModal = (id) => {
        setIsModalOpen(true);
        setModalServiceId(id);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setModalServiceId();

    };

    const fetchServices = async (query) => {
        try {
            const servicesData = await getAllServices(query);
            setServices(servicesData);
            setIsLoading(false);
        } catch (err) {
            handleError(err, 'Error while getting the services');
        }
    }

    const fetchUserServices = async () => {
        try {
            const servicesData = await getUserServices();
            setUserServices(servicesData);
            setIsLoading(false);
        } catch (err) {
            handleError(err, 'Error while getting the users services');
        }
    }


    const fetchService = async (serviceId) => {
        try {
            const serviceData = await getService(serviceId);
            setService(serviceData);
        } catch (err) {
            handleError(err, `Error while getting the service with id ${serviceId}`);
        }
    }

    const handleServiceEdit = async (description, phone, serviceId) => {
        try {
            await updateService({ description, phone }, serviceId);
            showToast('Service successfully updated');
            fetchUserServices();
        } catch (err) {
            handleError(err, "Error while updating the service");
        }
    };

    const handleImageUpload = async (serviceId, file) => {
        try {
            await uploadServiceImg(serviceId, file);
            showToast('Image successfully uploaded');
            fetchUserServices();
        } catch (err) {
            handleError(err, "Error while uploading the image");
        }
    };

    const handleServiceDeletion = async (serviceId) => {
        try {
            await deleteService(serviceId);
            showToast('Service successfully deleted');
            fetchUserServices();
        } catch (err) {
            handleError(err, "Error while deleting the service");
        }
    };
    const handleServiceAddition = async (service, description, phone) => {
        try {
            await createService({ service, description, phone });
            showToast('Service successfully added');
            fetchServices();
        } catch (err) {
            handleError(err, "Error while adding the service");
        }
    };

    return (
        <AppServicesContext.Provider
            value={{
                isLoading,
                services,
                service,
                setService,
                fetchServices,
                getService,
                fetchService,
                handleServiceAddition,
                handleServiceDeletion,
                handleImageUpload,
                handleServiceEdit,
                fetchUserServices,
                userServices,
                isModalOpen,
                openModal,
                closeModal,
                modalServiceId
            }}>
            {children}
        </AppServicesContext.Provider>
    )
}