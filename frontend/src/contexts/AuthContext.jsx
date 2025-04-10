import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with real logic
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem('authToken');
    token ? setIsAuthenticated(true) : setIsAuthenticated(false)
    setIsLoading(false)
  }, [])

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isCollapsed, setIsCollapsed, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);