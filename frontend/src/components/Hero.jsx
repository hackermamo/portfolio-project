import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import api from '../services/api';

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await api.get('/hero');
      setHeroData(response.data);
    } catch (error) {
      console.error('Error fetching hero data:', error);
      setHeroData({
        name: 'Maman Das',
        title: 'Creative Designer & Full-Stack Developer',
        description: 'I craft beautiful, interactive digital experiences using modern design principles and cutting-edge technology. Let\'s build something amazing together.',
        hero_image: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  if (loading) {
    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center">
        <div className="text-neon-green text-2xl">Loading...</div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-10"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-green/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-neon-green/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glowing Profile Image */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-secondary rounded-full blur-lg opacity-75" />
            {heroData?.hero_image ? (
              <img
                src={heroData.hero_image}
                alt="Profile"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-neon-green relative z-10 shadow-neon-glow-lg object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%2300ff00%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%23000%22%3ENo Image%3C/text%3E%3C/svg%3E';
                }}
              />
            ) : (
              <img
                src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%2300ff00%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%23000%22%3ENo Image%3C/text%3E%3C/svg%3E"
                alt="Profile"
                className="w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-neon-green relative z-10 shadow-neon-glow-lg"
              />
            )}
          </motion.div>
        </motion.div>

        {/* Name and Title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          Hello, I'm{' '}
          <span className="neon-text">{heroData?.name || 'Maman Das'}</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 mb-8"
        >
          {heroData?.title || 'Creative Designer & Full-Stack Developer'}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          {heroData?.description || 'I craft beautiful, interactive digital experiences using modern design principles and cutting-edge technology. Let\'s build something amazing together.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-6 justify-center mb-12"
        >
          <motion.a
            href="#resume"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-neon-green text-black font-bold rounded-lg hover:shadow-neon-glow-lg transition-shadow"
          >
            View Resume
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-neon-green text-neon-green font-bold rounded-lg glass-hover"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-6"
        >
          {[
            { icon: FaGithub, url: 'https://github.com/hackermamo', label: 'GitHub' },
            { icon: FaLinkedin, url: 'https://www.linkedin.com/in/maman-das-6934342b1', label: 'LinkedIn' },
            { icon: FaInstagram, url: 'https://www.instagram.com/mr_official_maman', label: 'Instagram' },
            { icon: FaWhatsapp, url: 'https://wa.me/919233061842?text=Hello%2C%20How%20are%20you%3F', label: 'WhatsApp' },
          ].map(({ icon: Icon, url, label }) => (
            <motion.a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: '#00ff88' }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl text-gray-400 hover:text-neon-green transition-colors"
              title={label}
            >
              <Icon />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="text-neon-green text-3xl">↓</div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
