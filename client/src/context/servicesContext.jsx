import { createContext, useEffect, useState } from "react";
import { createService, deleteService, getAllServices, getService, getUserServices, updateService } from "../api/api.js"
import { handleError, showToast } from "../utils/index.js";
import { useGlobalUserContext } from "../hooks/useGlobalUserContext.js";
export const AppServicesContext = createContext();

export const AppServicesProvider = ({ children }) => {
    const { user } = useGlobalUserContext();

    const [services, setServices] = useState([]);
    const [userServices, setUserServices] = useState([]);
    const [service, setService] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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

    const handleServiceEdit = async (service, serviceId) => {
        try {
            await updateService(service, serviceId);
            showToast('Service successfully updated');
            fetchServices();
        } catch (err) {
            handleError(err, "Error while updating the service");
        }
    };
    const handleServiceDeletion = async (serviceId) => {
        try {
            await deleteService(serviceId);
            showToast('Service successfully deleted');
            fetchServices();
        } catch (err) {
            handleError(err, "Error while deleting the service");
        }
    };
    const handleServiceAddition = async (service) => {
        try {
            await createService(service);
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
                handleServiceEdit,
                fetchUserServices,
                userServices
            }}>
            {children}
        </AppServicesContext.Provider>
    )
}