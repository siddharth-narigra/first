import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ name, model, capacity, fuel, price, image, onRentNow }) => {
  return (
    <motion.div 
      className="relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden"
      whileHover={{ y: -5 }}
    >
      {/* Image Container with Gradient Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={`${name}`} 
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="p-5">
        {/* Title Section */}
        <div className="mb-4">
          <h2 className="text-xl font-syne font-bold text-gray-900 mb-1">{name}</h2>
          <p className="text-gray-500 text-sm">{model}</p>
        </div>

        {/* Spec Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Fuel Type */}
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 12h3l3-8h6l3 8h3M5 12h14M6 16h12M8 12v4m4-4v4m4-4v4"/>
            </svg>
            <span className="text-sm text-gray-600">{fuel}</span>
          </div>

          {/* Capacity */}
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
            </svg>
            <span className="text-sm text-gray-600">{capacity} People</span>
          </div>

          {/* Transmission */}
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
            </svg>
            <span className="text-sm text-gray-600">Automatic</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/>
            </svg>
            <span className="text-sm text-gray-600">{price}/hr</span>
          </div>
        </div>

        {/* Rent Now Button */}
        <motion.button 
          onClick={onRentNow}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:gap-3 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Reserve Now</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Card;






// <!-- Card Content -->
// <div class="p-6">
//   <!-- Car Information -->
//   <div class="mb-4">
//     <h2 class="text-2xl font-bold text-gray-800">Tesla Model S</h2>
//     <p class="text-gray-600">Brand: Tesla | Model: S | Year: 2022</p>
//   </div>
  
//   <!-- Details Grid -->
//   <div class="grid grid-cols-2 gap-4 mb-6">
//     <!-- Seating Capacity -->
//     <div class="flex items-center">
//       <svg class="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
//            xmlns="http://www.w3.org/2000/svg">
//         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 13l2-2m0 0l7-7 7 7M13 5v6h6"/>
//         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z"/>
//       </svg>
//       <span class="text-gray-700 text-sm">5 Seats</span>
//     </div>
//     <!-- Fuel Type -->
//     <div class="flex items-center">
//       <svg class="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
//            xmlns="http://www.w3.org/2000/svg">
//         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//               d="M5 3h6l1 2h7a2 2 0 012 2v9.586a2 2 0 01-.586 1.414l-3.707 3.707A2 2 0 0115 21H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
//       </svg>
//       <span class="text-gray-700 text-sm">Electric</span>
//     </div>
//     <!-- Transmission -->
//     <div class="flex items-center">
//       <svg class="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
//            xmlns="http://www.w3.org/2000/svg">
//         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//               d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l.867 2.67a1 1 0 00.95.69h2.812c.969 0 1.371 1.24.588 1.81l-2.278 1.65a1 1 0 00-.364 1.118l.867 2.67c.3.921-.755 1.688-1.54 1.118l-2.278-1.65a1 1 0 00-1.175 0l-2.278 1.65c-.784.57-1.838-.197-1.54-1.118l.867-2.67a1 1 0 00-.364-1.118L2.98 8.097c-.783-.57-.38-1.81.588-1.81h2.812a1 1 0 00.95-.69l.867-2.67z" />
//       </svg>
//       <span class="text-gray-700 text-sm">Automatic</span>
//     </div>
//     <!-- Price per Day -->
//     <div class="flex items-center">
//       <svg class="w-6 h-6 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
//            xmlns="http://www.w3.org/2000/svg">
//         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//               d="M12 8c-1.105 0-2 .672-2 1.5v5a1.5 1.5 0 003 0v-5c0-.828-.895-1.5-2-1.5z" />
//         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//               d="M12 3v2m0 14v2m7-10h2M2 12h2m12.364 5.636l1.414 1.414M4.222 4.222l1.414 1.414m12.728 0l-1.414 1.414M4.222 19.778l1.414-1.414" />
//       </svg>
//       <span class="text-gray-700 text-sm">$120/day</span>
//     </div>
//   </div>
  
//   <!-- Rent Now Button -->
//   <button id="rentNowButton" class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
//     Rent Now
//   </button>
// </div>