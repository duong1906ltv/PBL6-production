import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/appContext"

const GuestRoute = () => {
    const { user } = useAppContext()    
    if (user) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};

export default GuestRoute;
