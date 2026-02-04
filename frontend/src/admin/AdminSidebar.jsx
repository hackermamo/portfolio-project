import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiUser, FiTrendingUp, FiBook, FiBriefcase, FiMail, FiMessageSquare, FiDownload } from 'react-icons/fi';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: FiHome, path: '/admin' },
    { label: 'Hero', icon: FiUser, path: '/admin/hero' },
    { label: 'About', icon: FiUser, path: '/admin/about' },
    { label: 'Skills', icon: FiTrendingUp, path: '/admin/skills' },
    { label: 'Projects', icon: FiBook, path: '/admin/projects' },
    { label: 'Experience', icon: FiBriefcase, path: '/admin/experience' },
    { label: 'Contact Info', icon: FiMail, path: '/admin/contact' },
    { label: 'Messages', icon: FiMessageSquare, path: '/admin/messages' },
    { label: 'Resume', icon: FiDownload, path: '/admin/resume' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={`fixed md:relative w-56 sm:w-64 h-full glass border-r border-neon-green/20 p-4 sm:p-6 flex flex-col z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } transition-transform duration-300`}
        initial={{ x: -256 }}
        animate={{ x: isOpen ? 0 : 0 }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-base sm:text-xl font-bold mb-6 sm:mb-8 flex items-center gap-2 text-white hover:text-neon-green transition-colors flex-shrink-0"
        >
          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-neon-green rounded-lg flex items-center justify-center text-black font-bold text-xs sm:text-sm">
            MD
          </div>
          <span>CODE</span>
        </Link>

        {/* Menu Items */}
        <nav className="flex-1 space-y-2 sm:space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base ${
                    isActive
                      ? 'bg-neon-green/20 border border-neon-green text-neon-green'
                      : 'text-gray-400 hover:text-neon-green border border-transparent hover:border-neon-green/30'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <Icon size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="font-semibold">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Footer Info */}
        <motion.div className="pt-4 sm:pt-6 border-t border-neon-green/20 flex-shrink-0">
          <div className="bg-neon-green/10 p-3 sm:p-4 rounded-lg border border-neon-green/30">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 sm:mb-2">Admin Panel</p>
            <p className="text-xs sm:text-sm text-neon-green font-semibold">v1.0.0</p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AdminSidebar;
