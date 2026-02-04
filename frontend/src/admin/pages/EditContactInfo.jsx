import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';

const EditContactInfo = () => {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    location: '',
    whatsapp: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await api.get('/contact-info');
      setContactInfo(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put('/contact-info', contactInfo);
      setMessage('✓ Contact info updated!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('✗ Failed to update');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl w-full mx-auto px-3 sm:px-0">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Contact Information</h1>

      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mb-6 p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
            message.includes('✓')
              ? 'bg-green-500/20 border border-green-500 text-green-400'
              : 'bg-red-500/20 border border-red-500 text-red-400'
          }`}
        >
          {message}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="glass p-6 sm:p-8 rounded-lg border border-neon-green/30 space-y-4 sm:space-y-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <label className="block text-white font-semibold text-xs sm:text-sm uppercase mb-2">Email</label>
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            className="w-full glass px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-neon-green/30 text-white text-sm"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
          <label className="block text-white font-semibold text-xs sm:text-sm uppercase mb-2">Phone</label>
          <input
            type="tel"
            value={contactInfo.phone}
            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
            className="w-full glass px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-neon-green/30 text-white text-sm"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <label className="block text-white font-semibold text-xs sm:text-sm uppercase mb-2">Location</label>
          <input
            type="text"
            value={contactInfo.location}
            onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
            className="w-full glass px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-neon-green/30 text-white text-sm"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
          <label className="block text-white font-semibold text-xs sm:text-sm uppercase mb-2">WhatsApp Link</label>
          <input
            type="url"
            value={contactInfo.whatsapp}
            onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })}
            placeholder="https://wa.me/91XXXXXXXXXX"
            className="w-full glass px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-neon-green/30 text-white text-sm placeholder-gray-600"
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={saving}
          whileHover={{ scale: 1.02 }}
          className="w-full py-2 sm:py-3 bg-neon-green text-black font-bold rounded-lg text-sm sm:text-base"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EditContactInfo;
