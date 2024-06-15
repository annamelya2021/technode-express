import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ProtectedAdminRoute = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            navigate('/', {replace: true})
        }
    }, [navigate]);
    return children;
};
export default ProtectedAdminRoute