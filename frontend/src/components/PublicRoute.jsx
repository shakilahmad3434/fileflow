import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  return token ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;