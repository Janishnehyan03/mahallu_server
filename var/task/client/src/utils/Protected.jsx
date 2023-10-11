import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, checkLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use a local state variable to track loading status
    const fetchData = async () => {
      await checkLogin();
      setIsLoading(false);
    };

    fetchData();
  }, [checkLogin]);

  if (isLoading) {
    // Display a loading indicator while checking login status
    return <div>Loading...</div>;
  }

  if (!user) {
    // If the user is not authenticated, navigate to the login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the children
  return children;
};

export default ProtectedRoute;
