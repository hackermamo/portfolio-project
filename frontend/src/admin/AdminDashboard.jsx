import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuthStore } from '../store/index';
import AdminSidebar from './AdminSidebar';
import EditHero from './pages/EditHero';
import EditAbout from './pages/EditAbout';
import ManageSkills from './pages/ManageSkills';
import ManageProjects from './pages/ManageProjects';
import ManageExperience from './pages/ManageExperience';
import EditContactInfo from './pages/EditContactInfo';
import ManageMessages from './pages/ManageMessages';
import ManageResume from './pages/ManageResume';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-neon-dark to-gray-900">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <motion.div
          className="glass border-b border-neon-green/20 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 sm:gap-4 flex-1 sm:flex-none">
            <h1 className="text-lg sm:text-2xl font-bold text-white hidden md:block">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 px-2 sm:px-4 py-2 bg-neon-green/20 border border-neon-green text-neon-green rounded-lg hover:bg-neon-green/30 transition-colors text-sm sm:text-base flex-shrink-0"
            >
              <FiMenu className="text-base sm:text-lg" />
              <span className="hidden sm:inline">Menu</span>
            </motion.button>

            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-red-500/20 border border-red-500 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm sm:text-base flex-shrink-0"
            >
              <FiLogOut className="text-base sm:text-lg" />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <motion.div
            className="p-3 sm:p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/hero" element={<EditHero />} />
              <Route path="/about" element={<EditAbout />} />
              <Route path="/skills" element={<ManageSkills />} />
              <Route path="/projects" element={<ManageProjects />} />
              <Route path="/experience" element={<ManageExperience />} />
              <Route path="/contact" element={<EditContactInfo />} />
              <Route path="/messages" element={<ManageMessages />} />
              <Route path="/resume" element={<ManageResume />} />
            </Routes>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Home Component
const DashboardHome = () => {
  const stats = [
    { label: 'Total Projects', value: '3', color: 'from-blue-500 to-cyan-500' },
    { label: 'Skills', value: '9', color: 'from-purple-500 to-pink-500' },
    { label: 'Experience', value: '3', color: 'from-green-500 to-emerald-500' },
    { label: 'Admin Logins', value: '∞', color: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome to <span className="neon-text">Admin Panel</span>
        </h1>
        <p className="text-gray-400">Manage your portfolio content and keep it updated</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className={`glass p-6 rounded-lg border border-neon-green/30 bg-gradient-to-br ${stat.color} opacity-10`}
          >
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass p-8 rounded-lg border border-neon-green/30"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Edit About', path: '/admin/about' },
            { title: 'Manage Skills', path: '/admin/skills' },
            { title: 'Add Projects', path: '/admin/projects' },
            { title: 'Add Experience', path: '/admin/experience' },
            { title: 'Contact Info', path: '/admin/contact' },
            { title: 'View Portfolio', path: '/' },
          ].map((action, idx) => (
            <motion.a
              key={idx}
              href={action.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass px-6 py-4 rounded-lg border border-neon-green/30 text-center font-semibold text-neon-green hover:border-neon-green/70 transition-colors"
            >
              {action.title}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Getting Started */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass p-8 rounded-lg border border-neon-green/30"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
        <ol className="space-y-3 text-gray-400 list-decimal list-inside">
          <li>Start by editing your <span className="text-neon-green">About</span> section</li>
          <li>Add your technical <span className="text-neon-green">Skills</span></li>
          <li>Showcase your best <span className="text-neon-green">Projects</span></li>
          <li>Add your <span className="text-neon-green">Work Experience</span></li>
          <li>Update your <span className="text-neon-green">Contact Information</span></li>
          <li>View your portfolio and share with the world!</li>
        </ol>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
