import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ isAuthenticated }) => {

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;