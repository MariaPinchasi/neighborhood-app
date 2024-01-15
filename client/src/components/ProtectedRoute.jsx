import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalUserContext } from '../hooks/useGlobalUserContext';

const ProtectedRoute = ({ children, isAdmin }) => {
    const { user } = useGlobalUserContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user || isAdmin && !user?.role === 'admin') {
            navigate('/');
        }
    }, [navigate, user, isAdmin])
    return children;

};

export default ProtectedRoute;
