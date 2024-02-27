import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../UserContext";


export default function PrivateRoutes() {
    const user = useAuth();
    if(!user.token) return <Navigate to="/login" />
    return <Outlet />
}
