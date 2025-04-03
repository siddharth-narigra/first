import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CountrySelect, StateSelect, CitySelect } from 'react-country-state-city';
import "react-country-state-city/dist/react-country-state-city.css";
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Booking = () => {
  const [country, setCountry] = useState(null);
  const [fromState, setFromState] = useState(null);
  const [fromCity, setFromCity] = useState(null);
  const [toState, setToState] = useState(null);
  const [toCity, setToCity] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const { car } = location.state || {};

  return (
    <>
      <Navbar />
      <br/><br/><br/><br/><br/>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white/50 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-500 hover:text-gray-700 mb-8 group transition-colors"
          >
            <svg className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Return to Selection
          </button>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="grid lg:grid-cols-2 gap-8 p-8">
              {/* Vehicle Details */}
              <div className="space-y-8">
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src={car.image}
                    alt={`${car.name} ${car.model}`}
                    className="w-full h-96 object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                <div className="space-y-4">
                  <h1 className="text-3xl font-syne font-bold text-gray-900">
                    {car.name} <span className="text-amber-600">{car.model}</span>
                  </h1>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-amber-600">👥</span>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Capacity</div>
                        <div className="font-medium">{car.capacity} People</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-amber-600">⛽</span>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Fuel Type</div>
                        <div className="font-medium">{car.fuel}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-8">
                <div className="border-b pb-6">
                  <h2 className="text-2xl font-syne font-bold text-gray-900">
                    Travel Details
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Provide your travel information for booking
                  </p>
                </div>

                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Traveler's Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      required
                    />
                  </div>

                  {/* Location Selectors */}
                  <div className="space-y-6">
                    <div>
                      <h6 className="text-sm font-medium text-gray-700 mb-2">
                        Country
                      </h6>
                      <CountrySelect
                        containerClassName="form-group"
                        inputClassName=""
                        onChange={(_country) => setCountry(_country)}
                        onTextChange={(_txt) => console.log(_txt)}
                        placeHolder="Select Country"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="text-sm font-medium text-gray-700 mb-2">
                          From Location
                        </h6>
                        <div className="space-y-4">
                          <StateSelect
                            countryid={country?.id}
                            containerClassName="form-group"
                            inputClassName=""
                            onChange={(_state) => setFromState(_state)}
                            onTextChange={(_txt) => console.log(_txt)}
                            defaultValue={fromState}
                            placeHolder="Select State"
                          />
                          <CitySelect
                            countryid={country?.id}
                            stateid={fromState?.id}
                            onChange={(_city) => setFromCity(_city)}
                            defaultValue={fromCity}
                            placeHolder="Select City"
                          />
                        </div>
                      </div>

                      <div>
                        <h6 className="text-sm font-medium text-gray-700 mb-2">
                          To Location
                        </h6>
                        <div className="space-y-4">
                          <StateSelect
                            countryid={country?.id}
                            containerClassName="form-group"
                            inputClassName=""
                            onChange={(_state) => setToState(_state)}
                            onTextChange={(_txt) => console.log(_txt)}
                            defaultValue={toState}
                            placeHolder="Select State"
                          />
                          <CitySelect
                            countryid={country?.id}
                            stateid={toState?.id}
                            onChange={(_city) => setToCity(_city)}
                            defaultValue={toCity}
                            placeHolder="Select City"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3.5 rounded-lg font-medium shadow-sm hover:shadow-amber-200/40 transition-all"
                  >
                    Confirm Booking →
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

Booking.propTypes = {
  car: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    fuel: PropTypes.string.isRequired,
  }),
};

export default Booking;
