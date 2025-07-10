import { useState, useEffect, createContext, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Fallback for when context is not available
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const authData = localStorage.getItem('spardha_admin_auth');
      if (authData) {
        const { timestamp } = JSON.parse(authData);
        const now = Date.now();
        const twelveHours = 12 * 60 * 60 * 1000;
        
        if (now - timestamp < twelveHours) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('spardha_admin_auth');
        }
      }
    }, []);

    const login = () => {
      const authData = {
        timestamp: Date.now(),
        isAuthenticated: true
      };
      localStorage.setItem('spardha_admin_auth', JSON.stringify(authData));
      setIsAuthenticated(true);
    };

    const logout = () => {
      localStorage.removeItem('spardha_admin_auth');
      setIsAuthenticated(false);
    };

    return { isAuthenticated, login, logout };
  }
  return context;
};