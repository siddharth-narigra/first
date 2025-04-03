import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import Booking from './pages/Booking';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import ProfilePage from './pages/ProfilePage';
// import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      {/* Optionally include your footer here if needed */}
      <Footer />
    </div>
  );
};

export default App;


// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import EmailVerify from './pages/EmailVerify'
// import ResetPassword from './pages/ResetPassword'
// import Booking from './pages/Booking'
// import { ToastContainer } from 'react-toastify';
// import Footer from './components/Footer'
// import ProfilePage from './pages/ProfilePage'
// // import 'react-toastify/dist/ReactToastify.css';



// const App = () => {
//   return (
//     <div >
 

//       <ToastContainer/>
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/login' element={<Login/>} />
//         <Route path='/email-verify' element={<EmailVerify />} />
//         <Route path='/reset-password' element={<ResetPassword />} />
//         <Route path="/booking" element={<Booking />} />
//         <Route path="/profile" element={<ProfilePage />} />
//       </Routes>
      
//     </div>
//   )
// }

// export default App