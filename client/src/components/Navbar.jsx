import React from 'react';
import { assets } from '../assets/assets';
import Profile from './Profile';

const Navbar = () => {
  return (
    <nav className="w-full absolute top-0 left-0 right-0 z-50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 py-4 sm:py-5">
        <div className="flex justify-between items-center bg-white/80 backdrop-blur-md rounded-full shadow-xs px-6 sm:px-8 py-3 border border-gray-100">
          {/* Logo with hover effect */}
          <a href="/" className="block transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-full">
            <img 
              src={assets.logo} 
              alt="Ride Rentals Logo" 
              className="w-32 sm:w-36 h-auto transition-opacity"
            />
          </a>

          {/* Profile container with hover states */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="transition-all duration-300 group-hover:bg-amber-50 group-hover:shadow-sm rounded-full p-1">
                <Profile />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-500 transition-all duration-300 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-75" />
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Adds subtle gradient line */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />  */}
    </nav>
  );
};

export default Navbar;