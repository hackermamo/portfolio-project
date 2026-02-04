import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Resume', id: 'resume' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/70 backdrop-blur-md border-b border-neon-green/20'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <motion.div
            className="text-xl sm:text-2xl font-bold cursor-pointer flex-shrink-0"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-white">MD</span>
            <span className="text-neon-green neon-text"> CODE</span>
          </motion.div>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 gap-4 lg:gap-8 mx-8">
            <div className="glass rounded-full px-6 lg:px-8 py-2 flex items-center gap-3 lg:gap-6">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs sm:text-sm lg:text-sm font-medium transition-colors relative pb-2 whitespace-nowrap ${
                    activeSection === item.id
                      ? 'text-neon-green'
                      : 'text-white hover:text-neon-green'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-green rounded-full"
                      layoutId="activeNav"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Desktop CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('contact')}
            className="hidden md:block px-4 lg:px-6 py-2 bg-neon-green text-black font-bold rounded-lg hover:shadow-neon-glow transition-shadow text-xs lg:text-base flex-shrink-0"
          >
            Let's Talk →
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-neon-green text-2xl flex-shrink-0"
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 glass border-t border-neon-green/20 mt-2"
          >
            <div className="flex flex-col gap-3 p-4 sm:p-6">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-neon-green neon-text'
                      : 'text-white hover:text-neon-green'
                  }`}
                  whileHover={{ x: 10 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick('contact')}
                className="px-4 py-2 bg-neon-green text-black font-bold rounded-lg w-full text-sm mt-2"
              >
                Let's Talk →
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
