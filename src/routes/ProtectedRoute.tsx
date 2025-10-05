import React, { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = React.memo(
  ({ children, role }) => {
    const { user, login, logout } = useAuth();

    if (!user) return <Navigate to="/" replace />;
    if (role && user.role !== role) return <Navigate to="/" replace />;

    return <>{children}</>;
  }
);

export default ProtectedRoute;
