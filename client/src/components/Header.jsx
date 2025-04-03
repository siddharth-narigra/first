import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext.jsx';
import Card from './Card.jsx';
import { assets } from '../assets/assets.js';


// Enhanced Filter Section Component
const FilterSection = ({ title, children }) => (
  <div className="mb-6 p-6 bg-white rounded-xl shadow-xs border border-gray-100 hover:shadow-sm transition-shadow">
    <h3 className="text-lg font-syne font-semibold mb-4 text-gray-800 flex items-center gap-2">
      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
      {title}
    </h3>
    {children}
  </div>
);

// Premium Checkbox Group Component
const CheckboxGroup = ({ options, selectedValues, onChange, name }) => (
  <div className="space-y-3">
    {options.map((option) => (
      <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            name={name}
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={onChange}
            className="opacity-0 absolute h-5 w-5"
          />
          <div className="w-5 h-5 flex items-center justify-center border-2 border-gray-300 rounded-sm group-hover:border-amber-400 transition-colors">
            <svg 
              className={`w-3 h-3 text-amber-500 ${selectedValues.includes(option.value) ? 'opacity-100' : 'opacity-0'} transition-opacity`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <span className="text-gray-600 group-hover:text-gray-800 transition-colors">{option.label}</span>
      </label>
    ))}
  </div>
);

// Filter Sidebar Component
const FilterSidebar = ({ filters, setFilters }) => {
  const fuelOptions = [
    { value: 'Diesel', label: 'Diesel' },
    { value: 'Petrol', label: 'Petrol' },
    { value: 'Electric', label: 'Electric' },
    { value: 'CNG', label: 'CNG' }
  ];

  const capacityOptions = [
    { value: '2', label: '2 People' },
    { value: '4', label: '4 People' },
    { value: '5', label: '5 People' },
    { value: '7', label: '7 People' }
  ];

  const typeOptions = [
    { value: 'Sedan', label: 'Sedan' },
    { value: 'Hatchback', label: 'Hatchback' },
    { value: 'SUV', label: 'SUV' }
  ];

  const handleFilterChange = (filterName) => (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      [filterName]: e.target.checked
        ? [...prev[filterName], value]
        : prev[filterName].filter((item) => item !== value)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Fuel Type Filter */}
      <FilterSection title="Fuel Preference">
        <CheckboxGroup
          options={fuelOptions}
          selectedValues={filters.fuel}
          onChange={handleFilterChange('fuel')}
          name="fuel"
        />
      </FilterSection>

      {/* Car Type Filter */}
      <FilterSection title="Car Type">
        <CheckboxGroup
          options={typeOptions}
          selectedValues={filters.carType}
          onChange={handleFilterChange('carType')}
          name="carType"
        />
      </FilterSection>

      {/* Passenger Capacity Filter */}
      {/* <FilterSection title="Passenger Capacity">
        <CheckboxGroup
          options={capacityOptions}
          selectedValues={filters.capacity}
          onChange={handleFilterChange('capacity')}
          name="capacity"
        />
      </FilterSection> */}

      {/* Price Range Filter (Optional) */}
      
      {/* <FilterSection title="Price Range">
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Price (₹)"
              className="input input-bordered w-full input-sm"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            />
            <input
              type="number"
              placeholder="Max Price (₹)"
              className="input input-bordered w-full input-sm"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
          </div>
        </div> 
      </FilterSection> */}
      
      
     
    </div>
    
  );
};

// Main Header Component
const Header = () => {
  const { userData } = useContext(AppContent);
  const navigate = useNavigate(); // Initialize navigation

  // Filter state
  const [filters, setFilters] = useState({
    fuel: [],
    minPrice: '',
    maxPrice: '',
    capacity: [],
    carType: []
  });

  // Sample car data with type information
  const carData = [
    { 
      name: "Toyota Fortuner", 
      model: "2023", 
      capacity: 7, 
      fuel: "Diesel", 
      price: 5000, 
      image: assets.img1,
      type: "SUV"
    },
    { 
      name: "Tesla Model 3", 
      model: "2022", 
      capacity: 5, 
      fuel: "Electric", 
      price: 7000, 
      image: assets.img2,
      type: "Sedan"
    },
    { 
      name: "Hyundai Creta", 
      model: "2021", 
      capacity: 5, 
      fuel: "Petrol", 
      price: 3500, 
      image: assets.img3,
      type: "SUV"
    },
    { 
      name: "Maruti Ertiga", 
      model: "2020", 
      capacity: 7, 
      fuel: "CNG", 
      price: 3000, 
      image: assets.img4,
      type: "Hatchback"
    },
    { 
      name: "Toyota Fortuner", 
      model: "2023", 
      capacity: 7, 
      fuel: "Diesel", 
      price: 5000, 
      image: assets.img5,
      type: "SUV"
    },
    { 
      name: "Tesla Model 3", 
      model: "2022", 
      capacity: 5, 
      fuel: "Electric", 
      price: 7000, 
      image: assets.img6,
      type: "Sedan"
    },
    { 
      name: "Hyundai Creta", 
      model: "2021", 
      capacity: 5, 
      fuel: "Petrol", 
      price: 3500, 
      image: assets.img7,
      type: "SUV"
    },
  ];

  // Filter the car data based on selected filters
  const filteredCars = carData.filter((car) => {
    const matchesFuel = filters.fuel.length ? filters.fuel.includes(car.fuel) : true;
    const matchesMinPrice = filters.minPrice ? car.price >= Number(filters.minPrice) : true;
    const matchesMaxPrice = filters.maxPrice ? car.price <= Number(filters.maxPrice) : true;
    const matchesCapacity = filters.capacity.length ? filters.capacity.includes(String(car.capacity)) : true;
    const matchesCarType = filters.carType.length ? filters.carType.includes(car.type) : true;
    
    return matchesFuel && matchesMinPrice && matchesMaxPrice && matchesCapacity && matchesCarType;
  });

  // Handler when "Rent Now" is clicked on a card
  const handleRentNow = (car) => {
    // Redirect to the booking page, passing the car details in state
    navigate("/booking", { state: { car } });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Enhanced Filter Sidebar */}
      <div className="lg:w-80 p-6 bg-white border-r border-gray-100 lg:h-screen lg:sticky lg:top-0">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-syne font-bold text-gray-900">Refine Selection</h2>
          <img 
            src={assets.filter} 
            alt="Filter icon" 
            className="h-8 w-8 p-1.5 bg-gray-100 rounded-lg hover:bg-amber-50 transition-colors"
          />
        </div>
        <FilterSidebar filters={filters} setFilters={setFilters} />
      </div>

      {/*  Main Content */}
      <div className="flex-1 p-8">
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCars.map((car, index) => (
              <Card
                key={index}
                name={car.name}
                model={car.model}
                capacity={car.capacity}
                fuel={car.fuel}
                price={car.price}
                image={car.image}
                onRentNow={() => handleRentNow(car)}
                className="transform transition-all duration-300 hover:-translate-y-1.5"
              />
            ))}
          </div>
        ) : (
          <div className="min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed rounded-2xl bg-white/50">
            <img src={assets.no_results} alt="No cars found" className="w-32 h-32 mb-6 opacity-60" />
            <p className="text-gray-500 text-lg">No vehicles match your criteria</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
      
      
    </div>
  );
};
export default Header;





// import React, { useContext, useState } from 'react';
// import { AppContent } from '../context/AppContext';
// import Card from './Card.jsx';
// import { assets } from '../assets/assets.js';

// // Filter Sidebar
// const FilterSidebar = ({ filters, setFilters }) => {
//   const handleFuelChange = (e) => {
//     setFilters({ ...filters, fuel: e.target.value });
//   };
//   const handleMinPriceChange = (e) => {
//     setFilters({ ...filters, minPrice: e.target.value });
//   };
//   const handleMaxPriceChange = (e) => {
//     setFilters({ ...filters, maxPrice: e.target.value });
//   };
//   const handleCapacityChange = (e) => {
//     setFilters({ ...filters, capacity: e.target.value });
//   };

//   return (
//     <div>
//       <h3 className="font-bold mb-2">Filters</h3>
      
//       {/* Fuel Type Filter */}
//       <div className="mb-4">
//         <h4 className="font-semibold">Fuel Type</h4>
//         <select
//           className="w-full border p-2 mt-1"
//           value={filters.fuel}
//           onChange={handleFuelChange}
//         >
//           <option value="">All</option>
//           <option value="Diesel">Diesel</option>
//           <option value="Petrol">Petrol</option>
//           <option value="Electric">Electric</option>
//           <option value="CNG">CNG</option>
//         </select>
//       </div>

//       {/* Price Range Filter */}
//       <div className="mb-4">
//         <h4 className="font-semibold">Price Range (₹)</h4>
//         <div className="flex space-x-2">
//           <input
//             type="number"
//             placeholder="Min"
//             className="border p-2 w-1/2"
//             value={filters.minPrice}
//             onChange={handleMinPriceChange}
//           />
//           <input
//             type="number"
//             placeholder="Max"
//             className="border p-2 w-1/2"
//             value={filters.maxPrice}
//             onChange={handleMaxPriceChange}
//           />
//         </div>
//       </div>

//       {/* Capacity Filter */}
//       <div className="mb-4">
//         <h4 className="font-semibold">Capacity</h4>
//         <select
//           className="w-full border p-2 mt-1"
//           value={filters.capacity}
//           onChange={handleCapacityChange}
//         >
//           <option value="">All</option>
//           <option value="2">2 People</option>
//           <option value="4">4 People</option>
//           <option value="5">5 People</option>
//           <option value="7">7 People</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// const Header = () => {
//   const { userData } = useContext(AppContent);

//   // Filter state
//   const [filters, setFilters] = useState({
//     fuel: "",
//     minPrice: "",
//     maxPrice: "",
//     capacity: ""
//   });

//   // State to hold the currently selected car for renting
//   const [selectedCar, setSelectedCar] = useState(null);

//   // Sample car data
//   const carData = [
//     { 
//       name: "Toyota Fortuner", 
//       model: "2023", 
//       capacity: 7, 
//       fuel: "Diesel", 
//       price: 5000, 
//       image: assets.img1
//     },
//     { 
//       name: "Tesla Model 3", 
//       model: "2022", 
//       capacity: 5, 
//       fuel: "Electric", 
//       price: 7000, 
//       image: assets.img2
//     },
//     { 
//       name: "Hyundai Creta", 
//       model: "2021", 
//       capacity: 5, 
//       fuel: "Petrol", 
//       price: 3500, 
//       image: assets.img3 
//     },
//     { 
//       name: "Maruti Ertiga", 
//       model: "2020", 
//       capacity: 7, 
//       fuel: "CNG", 
//       price: 3000, 
//       image: assets.img4
//     },
//     { 
//       name: "Toyota Fortuner", 
//       model: "2023", 
//       capacity: 7, 
//       fuel: "Diesel", 
//       price: 5000, 
//       image: assets.img5
//     },
//     { 
//       name: "Tesla Model 3", 
//       model: "2022", 
//       capacity: 5, 
//       fuel: "Electric", 
//       price: 7000, 
//       image: assets.img6 
//     },
//     { 
//       name: "Hyundai Creta", 
//       model: "2021", 
//       capacity: 5, 
//       fuel: "Petrol", 
//       price: 3500, 
//       image: assets.img7
//     },
//   ];

//   // Filter the car data
//   const filteredCars = carData.filter((car) => {
//     const matchesFuel = filters.fuel ? car.fuel === filters.fuel : true;
//     const matchesMinPrice = filters.minPrice ? car.price >= Number(filters.minPrice) : true;
//     const matchesMaxPrice = filters.maxPrice ? car.price <= Number(filters.maxPrice) : true;
//     const matchesCapacity = filters.capacity ? car.capacity === Number(filters.capacity) : true;
//     return matchesFuel && matchesMinPrice && matchesMaxPrice && matchesCapacity;
//   });

//   // Handler when "Rent Now" is clicked on a card
//   const handleRentNow = (car) => {
//     setSelectedCar(car);
//     // Open the modal (using the provided method)
//     document.getElementById('my_modal_5').showModal();
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-1/4 sticky top-0 h-screen overflow-y-auto p-4 border-r bg-white">
//         <FilterSidebar filters={filters} setFilters={setFilters} />
//       </div>

//       {/* Main Content */}
//       <div className="w-3/4 p-4">
//         {filteredCars.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {filteredCars.map((car, index) => (
//               // Pass the handleRentNow callback to each Card
//               <Card
//                 key={index}
//                 name={car.name}
//                 model={car.model}
//                 capacity={car.capacity}
//                 fuel={car.fuel}
//                 price={car.price}
//                 image={car.image}
//                 onRentNow={() => handleRentNow(car)}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="min-h-[300px] flex items-center justify-center border rounded-lg">
//             <p className="text-gray-600">No cars found for the selected filters.</p>
//           </div>
//         )}
//         <br /><br /><br /><br /><br />
//       </div>

//       {/* Modal for Rent Now */}
//       <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
//         <div className="modal-box">
//           {selectedCar ? (
//             <>
//               <h3 className="font-bold text-lg">
//                 {selectedCar.name} - {selectedCar.model}
//               </h3>
//               <img
//                 src={selectedCar.image}
//                 alt={`${selectedCar.name} ${selectedCar.model}`}
//                 className="w-full h-40 object-cover rounded-md my-4"
//               />
//               <p className="py-2">Capacity: {selectedCar.capacity} people</p>
//               <p className="py-2">Fuel: {selectedCar.fuel}</p>
//               <p className="py-2">Price: ₹{selectedCar.price} / day</p>
//               {/* Additional options like Payment can be added here */}
//               <button className="btn btn-primary my-2">Pay Now</button>
//             </>
//           ) : (
//             <h3 className="font-bold text-lg">No Car Selected</h3>
//           )}
//           <div className="modal-action">
//             <form method="dialog" onSubmit={() => setSelectedCar(null)}>
//               {/* Button inside form closes the modal */}
//               <button className="btn">Close</button>
//             </form>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default Header;
