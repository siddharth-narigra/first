import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

function ResetPassword() {

  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email,setEmail] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('');
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = useRef([]);
  
    const handleInput = (e, index) => {
      if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    };
  
    const handlePaste = (e) => {
      const paste = e.clipboardData.getData('text');
      const pasteArray = paste.split('');
      pasteArray.forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char;
        }
      });
    };

    const onSubmitEmail = async (e) => {
      e.preventDefault();
    
      try {
        const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
    
        data.success ? toast.success(data.message) : toast.error(data.message);
        data.success && setIsEmailSent(true); 
      } catch (error) {
        toast.error(error.message);
      }
    };


    const onSubmitOTP = async (e) => {
      e.preventDefault();
    
      const otpArray = inputRefs.current.map(e => e.value);
      setOtp(otpArray.join(''));
      setIsOtpSubmitted(true);
    };

    const onSubmitNewPassword = async (e) => {
      e.preventDefault();
    
      try {
        const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword });
    
        data.success ? toast.success(data.message) : toast.error(data.message);
        data.success && navigate('/login');
      } catch (error) {
        toast.error(error.message);
      }
    };


    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6">
        <div className="absolute top-6 left-6">
          <img 
            src={assets.logo} 
            alt="Logo" 
            className="w-32 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          />
        </div>
  
        {/* Email Input Section */}
        {!isEmailSent && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-syne font-bold text-gray-900 mb-2">
                Reset Password
              </h1>
              <p className="text-gray-500">
                Enter your registered email to receive a verification code
              </p>
            </div>
  
            <form onSubmit={onSubmitEmail} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder-gray-400"
                  required
                />
                <span className="absolute right-4 top-3.5 text-gray-400">✉️</span>
              </div>
  
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3.5 rounded-lg font-medium shadow-sm hover:shadow-amber-200/40 transition-all"
              >
                Send Verification Code
              </motion.button>
            </form>
          </motion.div>
        )}
  
        {/* OTP Input Section */}
        {!isOtpSubmitted && isEmailSent && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-syne font-bold text-gray-900 mb-2">
                Verification Code
              </h1>
              <p className="text-gray-500">
                Enter the 6-digit code sent to your email
              </p>
            </div>
  
            <form onSubmit={onSubmitOTP} className="space-y-6">
              <div className="flex justify-between mb-6" onPaste={handlePaste}>
                {Array(6).fill(0).map((_, index) => (
                  <input
                    type="text"
                    maxLength="1"
                    key={index}
                    required
                    className="w-12 h-12 border border-gray-200 text-center text-xl rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    ref={el => inputRefs.current[index] = el}
                    onInput={e => handleInput(e, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                  />
                ))}
              </div>
  
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3.5 rounded-lg font-medium shadow-sm hover:shadow-amber-200/40 transition-all"
              >
                Verify Code
              </motion.button>
            </form>
          </motion.div>
        )}
  
        {/* New Password Section */}
        {isOtpSubmitted && isEmailSent && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-syne font-bold text-gray-900 mb-2">
                New Password
              </h1>
              <p className="text-gray-500">
                Create a new password for your account
              </p>
            </div>
  
            <form onSubmit={onSubmitNewPassword} className="space-y-6">
              <div className="relative">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder-gray-400"
                  required
                />
                <span className="absolute right-4 top-3.5 text-gray-400">🔒</span>
              </div>
  
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3.5 rounded-lg font-medium shadow-sm hover:shadow-amber-200/40 transition-all"
              >
                Reset Password
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    );
  }
  
  export default ResetPassword;