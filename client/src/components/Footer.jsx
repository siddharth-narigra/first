import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
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
  );
};

export default Footer;