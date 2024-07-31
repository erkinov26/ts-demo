import { Navigate } from "react-router-dom";
import React, { ReactNode } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { authenticated } = useSelector((state: RootState) => state.auth);
	return authenticated ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
