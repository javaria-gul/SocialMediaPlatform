import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(() => localStorage.getItem("trendzz_token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!userToken);
  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem("trendzz_user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    setIsAuthenticated(!!userToken);
  }, [userToken]);

  const login = (token, user = null) => {
    localStorage.setItem("trendzz_token", token);
    if (user) {
      localStorage.setItem("trendzz_user", JSON.stringify(user));
      setUserData(user);
    }
    setUserToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("trendzz_token");
    localStorage.removeItem("trendzz_user");
    setUserToken(null);
    setIsAuthenticated(false);
    setUserData(null);
    // ✅ REMOVED: navigate from here - we'll handle navigation in components
    window.location.href = '/login'; // Simple redirect
  };

  // Function to update user data after onboarding
  const updateUserData = (newData) => {
    const updated = { ...userData, ...newData, firstLogin: false };
    localStorage.setItem("trendzz_user", JSON.stringify(updated));
    setUserData(updated);
    return updated;
  };

  // Function to mark onboarding as complete
  const completeOnboarding = (userData) => {
    const updatedUser = updateUserData(userData);
    return updatedUser;
  };

  return (
    <AuthContext.Provider value={{ 
      userToken, 
      isAuthenticated, 
      userData,
      login, 
      logout,
      updateUserData,
      completeOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
};