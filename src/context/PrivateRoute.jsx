import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"} replace />;
};

export default PrivateRoute;
