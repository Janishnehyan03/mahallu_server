// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/UserContext";

const Navbar = () => {
  const {user} = useAuth();
  return (
    <nav className="bg-[#6A9C89] p-4 flex items-center justify-between">
      {/* Logo on the left */}
      <div className="flex items-center">
        <div className="bg-[#6A9C89] rounded-full h-20 w-20  flex items-center justify-center text-white">
          <img src="/logo.jpg" className=" rounded-[50%]" />
        </div>
      </div>
      <h1 className="ml-2 text-2xl text-white font-bold">CDC Connect</h1>

      {/* Tabs on the right */}
      <ul className="flex space-x-4">
        <Link
          className="text-white font-semibold cursor-pointer uppercase hover:text-gray-500"
          to={`/`}
        >
          Home
        </Link>
        <Link
          className="text-white font-semibold cursor-pointer uppercase hover:text-gray-500"
          to={`/about`}
        >
          About
        </Link>
        <Link
          className="text-white font-semibold cursor-pointer uppercase hover:text-gray-500"
          to={`/account`}
        >
          My Account
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
