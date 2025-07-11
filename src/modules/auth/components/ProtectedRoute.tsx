import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("access_token");
  const userType = localStorage.getItem("user_usertype");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && (!userType || !allowedRoles.includes(userType))) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;