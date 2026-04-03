import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { useState } from "react";
const Navbar = () => {
  const { navigate, user, setUser } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="bg-cyan-50 shadow-md sticky top-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* left - logo */}
          <div>
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
              <img src="./logo.png" alt="logo" className="w-32" />
              </Link>
            </div>
          </div>

          {/* middle - menu items */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Menu
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
          </div>
          {/* right - cart & login/profile */}
          <div></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
