import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';


const RideRentals = () => {
  return (
    <div className="min-h-screen bg-white font-outfit overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-6 lg:px-12">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={assets.img1} 
            alt="Premium Fleet" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>

        <motion.div 
          className="relative z-10 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-7xl font-syne font-bold text-white mb-6 leading-tight">
            Redefining Urban
            <span className="block mt-4 text-amber-400">Mobility</span>
          </h1>
          <p className="text-lg lg:text-xl text-white/90 mb-8">
            Experience the city with our curated selection of premium vehicles
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="bg-amber-500 text-black px-8 py-4 rounded-full font-medium flex items-center gap-3"
          >
            Explore Fleet
            <span className="text-xl">→</span>
          </motion.button>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 px-6 lg:px-12 bg-neutral-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Seamless Booking', 
              text: '24/7 digital platform with instant confirmation',
              img: assets.img2
            },
            { 
              title: 'Premium Fleet', 
              text: 'Regularly maintained luxury vehicles',
              img: assets.img3
            },
            { 
              title: 'Live Support', 
              text: 'Dedicated concierge service',
              img: assets.img4
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="relative aspect-square overflow-hidden group"
              whileHover="hover"
              initial="rest"
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-syne font-bold mb-2">{item.title}</h3>
                  <p className="opacity-90">{item.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-syne font-bold mb-4">Our Curated Fleet</h2>
            <p className="text-neutral-600 max-w-xl mx-auto">
              Carefully selected vehicles for urban exploration
            </p>
          </div>

          <div className="grid gap-12">
            {[
              { 
                name: 'Urban Cruiser', 
                price: '₹2,500/hr',
                specs: '4 Seats • Automatic',
                img: assets.img5
              },
              { 
                name: 'Executive Class', 
                price: '₹4,200/hr',
                specs: 'Premium Interior • Chauffeur',
                img: assets.img6
              },
              { 
                name: 'Luxury Van', 
                price: '₹6,800/hr',
                specs: '7 Seats • Panoramic Roof',
                img: assets.img7
              }
            ].map((vehicle, index) => (
              <motion.div 
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl">
                  <img 
                    src={vehicle.img} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover transform transition-all duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-3xl font-syne font-bold mb-4">{vehicle.name}</h3>
                  <p className="text-2xl text-amber-600 mb-4">{vehicle.price}</p>
                  <p className="text-neutral-600 mb-6">{vehicle.specs}</p>
                  <button className="self-start border-2 border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-all">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-neutral-900 text-white px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-syne font-bold mb-4">Client Experiences</h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              Join thousands of satisfied urban explorers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "The perfect blend of luxury and convenience",
                author: "Anika Patel",
                role: "Frequent Traveler"
              },
              {
                text: "Impeccable service and vehicle quality",
                author: "Rohan Mehra",
                role: "Business Executive"
              },
              {
                text: "My go-to for premium urban mobility",
                author: "Priya Sharma",
                role: "Lifestyle Blogger"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="p-8 bg-neutral-800 rounded-2xl"
                whileHover={{ y: -10 }}
              >
                <div className="text-4xl text-amber-500 mb-4">“</div>
                <p className="text-lg mb-6">{testimonial.text}</p>
                <div className="border-t border-neutral-700 pt-6">
                  <h4 className="font-syne font-bold">{testimonial.author}</h4>
                  <p className="text-neutral-400 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 lg:px-12 bg-gradient-to-br from-neutral-900 to-amber-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-syne font-bold mb-8">
            Ready to Elevate Your Journey?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Experience urban mobility reimagined with our premium fleet
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-amber-500 text-black px-12 py-5 rounded-full font-medium text-lg flex items-center gap-3 mx-auto"
          >
            Start Your Rental
            <span className="text-xl">→</span>
          </motion.button>
        </div>
      </section>
      <footer className="bg-[#0A0A14] text-neutral-100 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-20">
          {/* Branding Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-syne font-bold">Ride Rentals</h3>
            <p className="text-neutral-400 leading-relaxed">
              Elevating mobility through precision and innovation
            </p>
            <div className="flex gap-4">
              {['twitter', 'instagram', 'linkedin'].map((platform) => (
                <motion.a
                  key={platform}
                  href="#"
                  className="p-2 rounded-full border border-white/10 hover:border-amber-400/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <svg 
                    className="w-5 h-5 fill-current text-neutral-300 hover:text-amber-400 transition-colors"
                    viewBox="0 0 24 24"
                  >
                    {/* Add your SVG paths for each social icon */}
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="space-y-4">
            <h4 className="font-syne font-bold text-neutral-200 mb-4">Explore</h4>
            <ul className="space-y-3">
              {['Fleet', 'Locations', 'Experience', 'Membership'].map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-neutral-400 hover:text-amber-400 flex items-center gap-2 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-xs">↠</span>
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-syne font-bold text-neutral-200 mb-4">Support</h4>
            <ul className="space-y-3">
              {['Contact', 'FAQ', 'Security', 'Privacy'].map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-neutral-400 hover:text-amber-400 flex items-center gap-2 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-xs">↠</span>
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="font-syne font-bold text-neutral-200">Stay Updated</h4>
            <form className="relative group">
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg focus:border-amber-400/30 focus:ring-2 focus:ring-amber-400/20 transition-all"
              />
              <motion.button
                type="submit"
                className="absolute right-2 top-2 bg-amber-400 text-[#0A0A14] px-6 py-2 rounded-lg flex items-center gap-2"
                whileHover={{ gap: 3 }}
              >
                Join
                <span className="text-lg">→</span>
              </motion.button>
            </form>
            <p className="text-xs text-neutral-500 mt-2">
              By subscribing, you agree to our Privacy Policy
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-neutral-500">
          <div className="text-center md:text-left">
            <p>© {new Date().getFullYear()} Ride Rentals. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <motion.a
              href="#"
              className="hover:text-amber-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              className="hover:text-amber-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default RideRentals;