import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";


const ProtectedRoutes = ({ children }) => {
    const cookieUser = Cookies.get("authUser");
    const stateUser = useSelector((state) => state.currentUser.user);

    return (
        (cookieUser || stateUser) ? children : <Navigate to={'/'} />
    )
}

export default ProtectedRoutes