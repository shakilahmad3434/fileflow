import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated }) => {
  //const isAuthenticated = localStorage.getItem("authToken") || sessionStorage.getItem('authToken'); // or use context/state

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;