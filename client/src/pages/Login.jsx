// import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { AppContent } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";

// const Login = () => {
//   const navigate = useNavigate();
//   const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

//   const [state, setState] = useState("Sign Up");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const onSubitHandler = async (e) => {
//     try {
//       e.preventDefault();
//       axios.defaults.withCredentials = true;

//       if (state === "Sign Up") {
//         // Call the modified registration endpoint that does NOT save user immediately
//         const { data } = await axios.post(backendUrl + "/api/auth/register", { name, email, password });
//         if (data.success) {
//           // Optionally set a temporary logged-in state if needed.
//           // Redirect to EmailVerify page and pass the user's email in the location state.
//           navigate("/email-verify", { state: { email } });
//         } else {
//           toast.error(data.message);
//         }
//       } else {
//         const { data } = await axios.post(backendUrl + "/api/auth/login", { email, password });
//         if (data.success) {
//           setIsLoggedin(true);
//           setTimeout(() => {
//             getUserData();
//           }, 500);
//           navigate("/");
//         } else {
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "An error occurred");
//     }
//   };

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
//             {state === "Sign Up" ? "Create Account" : "Welcome Back"}
//           </h1>
//           <p className="text-gray-500">
//             {state === "Sign Up" 
//               ? "Start your premium mobility journey" 
//               : "Login to continue your experience"}
//           </p>
//         </div>

//         <form onSubmit={onSubitHandler} className="space-y-6">
//           {state === "Sign Up" && (
//             <div className="relative">
//               <input
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder-gray-400"
//                 type="text"
//                 placeholder="Full Name"
//                 required
//               />
//               <span className="absolute right-4 top-3.5 text-gray-400">👤</span>
//             </div>
//           )}

//           <div className="relative">
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder-gray-400"
//               type="email"
//               placeholder="Email Address"
//               required
//             />
//             <span className="absolute right-4 top-3.5 text-gray-400">✉️</span>
//           </div>

//           <div className="relative">
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder-gray-400"
//               type="password"
//               placeholder="Password"
//               required
//             />
//             <span className="absolute right-4 top-3.5 text-gray-400">🔒</span>
//           </div>

//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={() => navigate("/reset-password")}
//               className="text-sm text-amber-600 hover:text-amber-700 transition-colors"
//             >
//               Forgot Password?
//             </button>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3.5 rounded-lg font-medium shadow-sm hover:shadow-amber-200/40 transition-all"
//           >
//             {state === "Sign Up" ? "Create Account" : "Login"}
//           </motion.button>

//           <p className="text-center text-gray-500 text-sm">
//             {state === "Sign Up" 
//               ? "Already have an account? "
//               : "Don't have an account? "}
//             <button
//               type="button"
//               onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
//               className="text-amber-600 hover:text-amber-700 font-medium underline transition-colors"
//             >
//               {state === "Sign Up" ? "Login here" : "Sign up"}
//             </button>
//           </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;



import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext"; // Correct import name
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  // Use the same naming as in your context:
  const { backendUrl, setIsLoggedin, getUserData, getAuthState } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", { name, email, password });
        if (data.success) {
          setIsLoggedin(true);
          // Option 1: If the register/login endpoint returns userData, set it directly:
          // setUserData(data.userData);
          
          // Option 2: Wait briefly then fetch the user data
          setTimeout(() => {
            getUserData();
          }, 500); // 500ms delay (adjust as needed)
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", { email, password });
        if (data.success) {
          setIsLoggedin(true);
          setTimeout(() => {
            getUserData();
          }, 500);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
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

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-syne font-bold text-gray-900 mb-2">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-500">
            {state === "Sign Up" 
              ? "Start your premium mobility journey" 
              : "Login to continue your experience"}
          </p>
        </div>

        <form onSubmit={onSubitHandler} className="space-y-6">
          {state === "Sign Up" && (
            <div className="relative">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder-gray-400"
                type="text"
                placeholder="Full Name"
                required
              />
              <span className="absolute right-4 top-3.5 text-gray-400">👤</span>
            </div>
          )}

          <div className="relative">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder-gray-400"
              type="email"
              placeholder="Email Address"
              required
            />
            <span className="absolute right-4 top-3.5 text-gray-400">✉️</span>
          </div>

          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder-gray-400"
              type="password"
              placeholder="Password"
              required
            />
            <span className="absolute right-4 top-3.5 text-gray-400">🔒</span>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/reset-password")}
              className="text-sm text-amber-600 hover:text-amber-700 transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3.5 rounded-lg font-medium shadow-sm hover:shadow-amber-200/40 transition-all"
          >
            {state === "Sign Up" ? "Create Account" : "Login"}
          </motion.button>

          <p className="text-center text-gray-500 text-sm">
            {state === "Sign Up" 
              ? "Already have an account? "
              : "Don't have an account? "}
            <button
              type="button"
              onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
              className="text-amber-600 hover:text-amber-700 font-medium underline transition-colors"
            >
              {state === "Sign Up" ? "Login here" : "Sign up"}
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;