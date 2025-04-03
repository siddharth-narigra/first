// import React, { useContext, useRef, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { assets } from '../assets/assets';
// import axios from 'axios';
// import { AppContent } from '../context/AppContext';
// import { toast } from 'react-toastify';
// import { motion } from 'framer-motion';

// function EmailVerify() {
//   axios.defaults.withCredentials = true;
//   const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent);
//   const navigate = useNavigate();
//   const location = useLocation();
//   // Retrieve the email passed from the sign-up process
//   const email = location.state?.email;

//   // If no email is provided, send the user back to the login page.
//   useEffect(() => {
//     if (!email) {
//       navigate("/login", { replace: true });
//     }
//   }, [email, navigate]);

//   // Prevent back navigation from this page
//   useEffect(() => {
//     window.history.pushState(null, "", window.location.href);
//     const handlePopState = () => {
//       window.history.pushState(null, "", window.location.href);
//     };
//     window.addEventListener("popstate", handlePopState);
//     return () => {
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, []);

//   const inputRefs = useRef([]);

//   const handleInput = (e, index) => {
//     if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     const paste = e.clipboardData.getData('text');
//     const pasteArray = paste.split('');
//     pasteArray.forEach((char, index) => {
//       if (inputRefs.current[index]) {
//         inputRefs.current[index].value = char;
//       }
//     });
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     const otp = inputRefs.current.map(input => input.value).join('');
//     console.log("Submitting OTP:", otp);
//     try {
//       // Send both email and otp for verification
//       const response = await axios.post(`${backendUrl}/api/auth/verify-email`, { email, otp });
//       console.log("Response from verify-account:", response.data);

//       if (response.data.success) {
//         toast.success(response.data.message);
//         // Optionally, update user data if needed
//         getUserData();
//         // Redirect to home page (using replace so the EmailVerify page isn’t reachable via back navigation)
//         navigate('/', { replace: true });
//       } else {
//         toast.error(response.data.message || "Error verifying OTP");
//       }
//     } catch (error) {
//       console.error("Error in OTP submission:", error);
//       toast.error(error.response?.data?.message || error.message || "Verification failed");
//     }
//   };

//   // Prevent verified users from visiting the email verification page repeatedly.
//   useEffect(() => {
//     if (isLoggedin && userData && userData.isAccountVerified) {
//       navigate('/', { replace: true });
//     }
//   }, [isLoggedin, userData, navigate]);

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6">
//       <div className="absolute top-6 left-6">
//         <img 
//           src={assets.logo} 
//           alt="Logo" 
//           className="w-32 cursor-pointer hover:opacity-80 transition-opacity"
//           onClick={() => navigate("/")}
//         />
//       </div>

//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10"
//       >
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-syne font-bold text-gray-900 mb-2">
//             Verify Your Email
//           </h1>
//           <p className="text-gray-500">
//             We've sent a 6-digit code to {email}
//           </p>
//         </div>

//         <form onSubmit={onSubmitHandler} className="space-y-6">
//           <div className="flex justify-between mb-6" onPaste={handlePaste}>
//             {Array(6).fill(0).map((_, index) => (
//               <input
//                 type="text"
//                 maxLength="1"
//                 key={index}
//                 required
//                 className="w-12 h-12 border border-gray-200 text-center text-xl rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                 ref={el => inputRefs.current[index] = el}
//                 onInput={e => handleInput(e, index)}
//                 onKeyDown={e => handleKeyDown(e, index)}
//               />
//             ))}
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3.5 rounded-lg font-medium shadow-sm hover:shadow-amber-200/40 transition-all"
//           >
//             Verify Email
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }

// export default EmailVerify;



import React, { useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import axios from 'axios';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
function EmailVerify() {
  axios.defaults.withCredentials = true;
  const { backendUrl , isLoggedin , userData , getUserData  } = useContext(AppContent);
  const navigate = useNavigate();

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const otp = inputRefs.current.map(input => input.value).join('');
    console.log("Submitting OTP:", otp);
    try {
      const response = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp });
      console.log("Response from verify-account:", response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(response.data.message || "Error verifying OTP");
      }
    } catch (error) {
      console.error("Error in OTP submission:", error);
      toast.error(error.response?.data?.message || error.message || "Verification failed");
    }
  };

  // the below code is for preventing the verified user from visiting the email verify page again and again.
  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/');
  }, [isLoggedin, userData]);

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

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-syne font-bold text-gray-900 mb-2">
            Verify Your Email
          </h1>
          <p className="text-gray-500">
            We've sent a 6-digit code to your email address
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-6">
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
            Verify Email
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default EmailVerify;