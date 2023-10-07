// src/AppRouter.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./screens/LoginScreen.jsx";
import AuthProvider from "./utils/UserContext.jsx";

// Import your components/pages
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import NotFound from "./components/NotFound";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProtectedRoute from "./utils/Protected.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />;
      <Route path="/about" element={<About />} />;
      {/* <Route path="admin" element={<ProtectedRoute element={<AdminPage />} adminOnly />} /> */}
      <Route path="/contact" element={<Contact />} />;
      <Route element={<NotFound />} />;
    </Routes>
  );
};

export default AppRouter;
