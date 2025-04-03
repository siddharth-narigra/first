import React, { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LandingPage from '../components/LandingPage';
import { AppContent } from '../context/AppContext';

const Home = () => {
  const { userData } = useContext(AppContent);

  // Prevents user to go bakc to login page after logging in
  useEffect(() => {
    if (userData) {
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = function () {
        window.history.pushState(null, '', window.location.href);
      };
    }
  }, [userData]);

  return (
    <div className="min-h-screen bg-url('/bg_img.png') bg-cover bg-center">
      
      <div>

        {userData ? (
            <>
              <Navbar />
              <br/><br/><br/><br/><br/>
              <Header />
              
              <Footer />
            </>
          ) : (
            <>
            <Navbar />
            <LandingPage />
            </>
        )}


      </div>     

      
    </div>
  );
};

export default Home;
