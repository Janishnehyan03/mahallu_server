// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios"; // Import your Axios instance

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
    try {
      const response = await Axios.get("/user/token/check-login");
      setUser(response.data);
    } catch (error) {
      // Handle error or set user to null if not logged in
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

  const authContextValue = {
    user,
    loading,
    checkLogin,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
