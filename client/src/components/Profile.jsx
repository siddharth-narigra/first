import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';

const Profile = () => {

    const navigate = useNavigate();
    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  const sendVerificationOtp = async () => {
    console.log("sendVerificationOtp triggered");
    console.log("Using backendUrl:", backendUrl);
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
      console.log("Response from send-verify-otp:", response.data);
  
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/email-verify');
      } else {
        toast.error(response.data.message || "Error in sending OTP");
      }
    } catch (error) {
      console.error("Error in sendVerificationOtp:", error);
      if (error.response) {
        console.error("Response error data:", error.response.data);
        toast.error(error.response.data.message || "Request failed");
      } else {
        toast.error(error.message || "Request failed");
      }
    }
  };


  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${backendUrl}/api/auth/logout`);
      console.log("Logout response:", response.data);

      if (response.data.success) {
        setIsLoggedin(false);
        setUserData(false);
        localStorage.removeItem("isLoggedIn");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };


  return (
    <div>
        {userData ? 
        <div className="relative group">
            {/* Profile Initial */}
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white font-syne font-bold text-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
                onClick={() => navigate('/profile')}>
                {userData.name[0].toUpperCase()}
                
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-12 w-48 origin-top-right opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out z-50">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                    <ul className="space-y-1">
                        {!userData.isAccountVerified &&
                            <li 
                                onClick={sendVerificationOtp}
                                className="flex items-center px-4 py-3 text-gray-700 hover:bg-amber-50 cursor-pointer transition-colors group"
                            >
                                <svg className="w-5 h-5 mr-3 text-amber-600 group-hover:text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                Verify Email
                            </li>
                        }
                        <li 
                            onClick={logout}
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-amber-50 cursor-pointer transition-colors group"
                        >
                            <svg className="w-5 h-5 mr-3 text-amber-600 group-hover:text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                            </svg>
                            Logout
                        </li>
                    </ul>
                </div>
            </div>
        </div> 
        : 
        <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 bg-gradient-to-br from-amber-500 to-amber-600 text-white px-6 py-2.5 rounded-full shadow-sm hover:shadow-md hover:from-amber-600 hover:to-amber-700 transition-all"
        >
            <span className="font-medium">Login</span>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
        </button>
        }
    </div>
)
}

export default Profile;