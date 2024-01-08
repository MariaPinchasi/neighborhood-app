import { useContext } from "react";
import { AppUserContext } from '../context/userContext.jsx'
export const useGlobalUserContext = () => {
    return useContext(AppUserContext);
}