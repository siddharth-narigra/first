import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SparklesIcon, CheckBadgeIcon, UserGroupIcon } from '@heroicons/react/24/solid';

const First = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const stats = [
    { icon: SparklesIcon, value: '500+', label: 'Premium Rides' },
    { icon: CheckBadgeIcon, value: '98%', label: 'Satisfaction Rate' },
    { icon: UserGroupIcon, value: '50k+', label: 'Happy Customers' }
  ];

  const reviews = [
    { name: 'Sarah J.', comment: 'Best car rental experience ever! Seamless process and amazing vehicles.', color: 'bg-blue-100' },
    { name: 'Mike R.', comment: 'Impeccable service and top-notch vehicle quality. 10/10!', color: 'bg-pink-100' },
    { name: 'Emma L.', comment: 'Changed how I travel. Quick, easy, and reliable.', color: 'bg-green-100' }
  ];

  return (
    <div 
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#F3F3F3',
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%, transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%, transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%, transparent)`,
        backgroundSize: '55px 55px'
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 animate-float">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 lg:px-24 pt-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Journey Begins with 
              <span className="block mt-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Perfect Rides
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-xl">
              Discover freedom on four wheels with our curated collection of premium vehicles. 
              No account needed to explore our fleet!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Explore Vehicles
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
          >
            <img 
              src="/hero.jpg" 
              alt="Luxury cars" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-24 px-6 lg:px-24 bg-white/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2 }}
                ref={ref}
                className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${stat.color} group-hover:bg-opacity-80 transition-all`}>
                  <Icon className="w-8 h-8 text-gray-900" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Review Cards */}
      <section className="py-24 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Why Riders Love Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={`${review.color} p-8 rounded-3xl relative overflow-hidden shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="absolute -top-8 -right-8 opacity-10">
                  <svg
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-48 h-48 transform rotate-45"
                  >
                    <path
                      transform="translate(100 100)"
                      d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
                    />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div className="text-2xl font-bold text-gray-900 mb-4">{review.name}</div>
                  <p className="text-gray-600 mb-6">"{review.comment}"</p>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <SparklesIcon key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-white mb-8"
          >
            Ready for Your Next Adventure?
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 mb-12 max-w-2xl mx-auto"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
          >
            Join thousands of satisfied riders exploring the world on their terms
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Start Your Journey Now
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default First;