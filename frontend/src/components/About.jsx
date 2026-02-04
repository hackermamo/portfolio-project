import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await api.get('/about');
      const data = response.data;
      console.log('About data from API:', data); // Debug log
      
      // Ensure features array exists
      if (!data.features) {
        data.features = [
          { title: 'Award Winner', icon: '🏆' },
          { title: 'Client Focused', icon: '👥' },
          { title: 'Innovation', icon: '💡' },
          { title: 'On Time', icon: '⏱️' },
        ];
      }
      
      // Ensure profileImage is set from profile_image field
      if (!data.profileImage && data.profile_image) {
        data.profileImage = data.profile_image;
      }
      
      setAboutData(data);
    } catch (error) {
      console.error('Error fetching about data:', error);
      // Set default data if API fails
      setAboutData({
        title: 'About Me',
        subtitle: 'GET TO KNOW ME',
        role: 'Creative Designer & Visual Storyteller',
        description: `My name is Maman Das, and I am currently pursuing a Bachelor's degree in Computer Science and Engineering (CSE). Alongside my academic journey, I am a freelance graphic designer with over 4 years of hands-on experience in creative visual design.

I specialize in branding, logo design, UI/UX, event branding, and digital creatives, with a strong focus on visual storytelling and unique concepts.

My background in CSE also gives me a basic understanding of coding and technology, which helps me bridge creativity with technical thinking and deliver modern, impactful design solutions.`,
        profileImage: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22500%22%3E%3Crect fill=%2300ff00%22 width=%22400%22 height=%22500%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%23000%22%3ENo Image%3C/text%3E%3C/svg%3E',
        features: [
          { title: 'Award Winner', icon: '🏆' },
          { title: 'Client Focused', icon: '👥' },
          { title: 'Innovation', icon: '💡' },
          { title: 'On Time', icon: '⏱️' },
        ],
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  if (loading) {
    return (
      <section id="about" className="min-h-screen flex items-center justify-center">
        <div className="text-neon-green text-2xl">Loading...</div>
      </section>
    );
  }

  return (
    <section id="about" className="relative min-h-screen flex items-center py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Portrait Image */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Glow effect - larger and more prominent */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-green via-neon-secondary to-transparent rounded-3xl blur-3xl opacity-80 -inset-4" />
              {/* Image container */}
              {aboutData?.profileImage ? (
                <img
                  src={aboutData.profileImage}
                  alt="Profile"
                  className="relative z-10 w-full rounded-3xl shadow-2xl object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22500%22%3E%3Crect fill=%2300ff00%22 width=%22400%22 height=%22500%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%23000%22%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
              ) : (
                <div className="relative z-10 w-full h-96 rounded-3xl bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400">No profile image</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div variants={containerVariants} className="space-y-8">
            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-neon-green font-semibold text-sm tracking-widest uppercase"
            >
              {aboutData?.subtitle}
            </motion.p>

            {/* Title */}
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold">
              <span className="text-white">{aboutData?.title}</span>
            </motion.h2>

            {/* Role */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-neon-green font-semibold"
            >
              {aboutData?.role}
            </motion.p>

            {/* Description */}
            <motion.div variants={itemVariants} className="text-gray-300 space-y-4 leading-relaxed">
              {aboutData?.description ? (
                typeof aboutData.description === 'string' ? (
                  aboutData.description.includes('\n\n') ? (
                    // If has double newlines, split and display
                    aboutData.description.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-base md:text-lg text-gray-300">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    // Otherwise display as single paragraph
                    <p className="text-base md:text-lg text-gray-300 whitespace-pre-wrap">
                      {aboutData.description}
                    </p>
                  )
                ) : null
              ) : null}
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-4 mt-8"
            >
              {aboutData?.features && aboutData.features.length > 0 ? (
                aboutData.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass p-4 rounded-lg border border-neon-green/30 hover:border-neon-green/70 transition-all"
                  >
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <p className="text-sm font-semibold text-white">{feature.title}</p>
                  </motion.div>
                ))
              ) : null}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
