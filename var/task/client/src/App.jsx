// src/App.js
import React from "react";
import AppRouter from "./AppRouter";
import Navbar from "./components/Navbar";
import AuthProvider from "./utils/UserContext";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <main>
        <AppRouter />
      </main>
    </AuthProvider>
  );
}

export default App;
