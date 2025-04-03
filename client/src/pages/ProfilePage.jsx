import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userData, loading, setUserData, setIsLoggedin, backendUrl } = useContext(AppContent);
  const [delayedLoading] = useState(true);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${backendUrl}/api/auth/logout`);
      console.log("Logout response:", response.data);

      if (response.data.success) {
        setIsLoggedin(false);
        setUserData(null);
        localStorage.removeItem("isLoggedIn");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (!loading && !userData && !delayedLoading) {
      navigate('/login');
    }
  }, [loading, userData, delayedLoading, navigate]);

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-gray-700 mb-8 group transition-colors"
        >
          <svg className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-8 text-center">
            <div className="relative inline-block">
              <div
                className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center text-4xl text-white font-bold mb-4 shadow-lg">
                {userData.name[0].toUpperCase()}
              </div>
              {!userData.isAccountVerified && (
                <div className="absolute bottom-0 right-0 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                  Unverified
                </div>
              )}
            </div>
            <h1 className="text-3xl font-syne font-bold text-gray-900 mb-2">{userData.name}</h1>
            <p className="text-gray-600">{userData.email}</p>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-syne font-bold text-gray-900 mb-6">Account Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Status</h3>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${userData.isAccountVerified ? 'bg-green-500' : 'bg-amber-500'}`} />
                  <span className="text-gray-600">
                    {userData.isAccountVerified ? 'Verified Account' : 'Pending Verification'}
                  </span>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Membership</h3>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600">
                    Member since {new Date(userData.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col gap-4">
              {!userData.isAccountVerified && (
                <button
                  onClick={() => {
                    /* handle resend verification logic */
                  }}
                  className="w-full md:w-auto px-6 py-3 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Resend Verification Email
                </button>
              )}

              <button
                onClick={logout}
                className="w-full md:w-auto px-6 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout Account
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
