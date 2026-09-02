import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('codevora_token') || null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from JWT token on initial app load
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('codevora_token');
      if (storedToken) {
        try {
          const userData = await authService.getCurrentUser(storedToken);
          setUser(userData);
          setToken(storedToken);
        } catch (error) {
          console.warn('Session restoration failed:', error.message);
          // Token invalid or expired, clear storage
          localStorage.removeItem('codevora_token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  /**
   * Login Handler
   */
  const login = async (identifier, password) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ identifier, password });
      
      const { access_token, user: loggedInUser } = response;
      
      // Save token & state
      localStorage.setItem('codevora_token', access_token);
      setToken(access_token);
      setUser(loggedInUser);
      setIsLoading(false);
      
      return loggedInUser;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  /**
   * Signup Handler
   */
  const signup = async (username, email, password) => {
    setIsLoading(true);
    try {
      const newUser = await authService.signup({ username, email, password });
      setIsLoading(false);
      return newUser;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  /**
   * Logout Handler
   */
  const logout = () => {
    localStorage.removeItem('codevora_token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user && token),
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
