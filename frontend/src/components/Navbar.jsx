import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Calendar, ShoppingCart, UserCircleIcon } from "lucide-react";
const Navbar = () => {
  const { navigate, user, setUser } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

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
          <div className="flex items-center space-x">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart size={22} className="text-gray-700"/>
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xl rounded-full w-5 h-5 flex items-center justify-center font-medium">3</span>
            </button>
            <div className="hidden md:block">
              {user ? (
                <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
                   <UserCircle size={30} className="text-gray-700" />

                  </button>
                  {isProfileOpen && (
                    <div onMouseEnter={()=>setIsProfileOpen(true)} onMouseLeave={()=>setIsProfileOpen(false)} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100"></div>
                  )}   <Link to={'/my-bookings'} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                   <Calendar size={18} className="mr-3"/>   
                  My Bookings </Link>
                   <Link to={'/my-orders'} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                   <Package size={18} className="mr-3"/>   
                  My Orders </Link>
                  <button>
                    <Logout size={18} className="mr-3"/>
                    Logout
                  </button>
                </div>
                
              ) : (
                <button className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
