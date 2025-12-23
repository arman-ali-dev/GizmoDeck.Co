import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicOnlyRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicOnlyRoute;
