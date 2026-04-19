import React from 'react';
import { ShieldCheck, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = ({ language, toggleLanguage }) => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass-panel mx-4 mt-4 mb-2 md:mx-8 md:mt-6 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <motion.div 
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
          className="text-neon-blue"
        >
          <ShieldCheck size={32} />
        </motion.div>
        <span className="text-xl font-bold tracking-widest text-gradient">
          TRUSTDOC AI
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors border border-white/20 px-3 py-1.5 rounded-full hover:border-neon-purple hover:shadow-[0_0_10px_rgba(176,38,255,0.4)]"
        >
          <Globe size={16} />
          {language === 'en' ? 'EN' : 'HI'}
        </button>

        {location.pathname !== '/dashboard' && location.pathname !== '/results' && (
          <Link 
            to="/dashboard"
            className="hidden md:inline-flex bg-neon-blue/10 border border-neon-blue text-neon-blue px-5 py-2 rounded-lg font-medium hover:bg-neon-blue hover:text-dark-900 hover:shadow-neon-blue transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Launch System
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
