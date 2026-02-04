import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';

const EditHero = () => {
  const [formData, setFormData] = useState({
    name: 'Maman Das',
    title: 'Creative Designer & Full-Stack Developer',
    description: '',
    hero_image: null,
  });
  const [heroImagePreview, setHeroImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await api.get('/hero');
      setFormData(response.data);
      if (response.data.hero_image) {
        setHeroImagePreview(response.data.hero_image);
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        hero_image: file,
      }));
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      
      if (formData.hero_image instanceof File) {
        formDataToSend.append('file', formData.hero_image);
      }

      await api.put('/hero', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('✓ Hero section updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('✗ Failed to update hero section');
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-neon-green text-2xl">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl w-full mx-auto px-3 sm:px-0"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Edit Hero Section</h1>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg ${
            message.includes('✓')
              ? 'bg-green-500/20 border border-green-500 text-green-400'
              : 'bg-red-500/20 border border-red-500 text-red-400'
          }`}
        >
          {message}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-white font-semibold text-sm uppercase tracking-wider mb-2">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full glass px-4 py-3 rounded-lg border border-neon-green/30 focus:border-neon-green text-white focus:outline-none transition-colors"
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label className="block text-white font-semibold text-sm uppercase tracking-wider mb-2">
            Title/Role
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full glass px-4 py-3 rounded-lg border border-neon-green/30 focus:border-neon-green text-white focus:outline-none transition-colors"
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-white font-semibold text-sm uppercase tracking-wider mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="5"
            className="w-full glass px-4 py-3 rounded-lg border border-neon-green/30 focus:border-neon-green text-white focus:outline-none transition-colors resize-none"
            placeholder="Enter your hero description..."
          />
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <label className="block text-white font-semibold text-sm uppercase tracking-wider mb-2">
            Hero Image (Profile Picture)
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full glass px-4 py-3 rounded-lg border border-neon-green/30 text-gray-400 file:text-neon-green file:bg-neon-green/20 file:border-0 file:rounded file:px-4 file:py-2 file:cursor-pointer"
              />
            </div>
          </div>
          {heroImagePreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4"
            >
              <p className="text-sm text-neon-green mb-2">Preview:</p>
              <img
                src={heroImagePreview}
                alt="Hero Preview"
                className="w-40 h-40 rounded-full border border-neon-green/30 object-cover shadow-lg"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={saving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-neon-green text-black font-bold rounded-lg hover:shadow-neon-glow transition-shadow disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EditHero;
