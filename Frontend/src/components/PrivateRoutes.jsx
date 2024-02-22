import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../UserContext";


export default function PrivateRoutes() {
    const { userInfo } = useContext(UserContext);

    const isAuthenticated = userInfo?.username;
    console.log(userInfo)
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
