import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ isAuthenticated }) => {
  //const isAuthenticated = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;