import { useContext } from "react";
import { AppServicesContext } from '../context/servicesContext.jsx'
export const useGlobalServicesContext = () => {
    return useContext(AppServicesContext);
}