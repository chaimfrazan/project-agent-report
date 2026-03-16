import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUserContext from '../contextProvider/userContext'

interface Props {
    allowedRoles?: Array<"admin" | "agent">;
}

export default function ProtectedRoute({ allowedRoles }: Props) {
    const { user } = useUserContext();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }


   if (allowedRoles && !allowedRoles.includes(user.role)) {
        const homePath = user?.role === "admin" ? "/admin/home" : "/agent/home";
        return <Navigate to={homePath} replace />;
    }

    return <Outlet />;
}