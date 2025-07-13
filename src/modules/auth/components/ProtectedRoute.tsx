import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;

  allowedRoles?: string[]; // ['admin', 'professor', 'student']
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  
  const location = useLocation();
  const token = localStorage.getItem("access_token");
  const userType = localStorage.getItem("user_usertype");

  // Si no tiene token de acceso, redirige a la página de inicio de login

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
// Si no hay restricción de roles o el usuario tiene un rol permitido
  if (!allowedRoles || (userType && allowedRoles.includes(userType))) {
    return <>{children}</>;
  }

  // Redirección basada en el tipo de usuario
  switch(userType) {
    case 'admin':
      return <Navigate to={`/panel-control/${userType}`} replace />;
    case 'professor':
      return <Navigate to={`/panel-control-professor/${userType}`} replace />;
    default:
      return <Navigate to="/dashboard" replace />;
  }

};


export default ProtectedRoute;