import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await api.get('/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
      // Set default skills if API fails
      setSkills([
        { id: 1, name: 'React', level: 90, category: 'frontend' },
        { id: 2, name: 'Tailwind CSS', level: 85, category: 'frontend' },
        { id: 3, name: 'JavaScript', level: 88, category: 'frontend' },
        { id: 4, name: 'Python', level: 82, category: 'backend' },
        { id: 5, name: 'FastAPI', level: 80, category: 'backend' },
        { id: 6, name: 'MongoDB', level: 78, category: 'backend' },
        { id: 7, name: 'Figma', level: 92, category: 'tools' },
        { id: 8, name: 'Adobe XD', level: 85, category: 'tools' },
        { id: 9, name: 'Git', level: 88, category: 'tools' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'frontend', 'backend', 'tools'];
  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
      <section id="skills" className="min-h-screen flex items-center justify-center">
        <div className="text-neon-green text-2xl">Loading...</div>
      </section>
    );
  }

  return (
    <section id="skills" className="relative min-h-screen flex items-center py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-neon-green font-semibold text-sm tracking-widest uppercase mb-4">
            My Expertise
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-white">Technical </span>
            <span className="neon-text">Skills</span>
          </h2>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-neon-green text-black shadow-neon-glow-lg'
                  : 'glass border-neon-green/30 text-white hover:border-neon-green/70'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="glass p-6 rounded-lg border border-neon-green/30 hover:border-neon-green/70 transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                <span className="text-neon-green text-sm font-bold">{skill.level}%</span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-neon-green to-neon-secondary rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>

              {/* Category Badge */}
              <div className="mt-4">
                <span className="text-xs px-3 py-1 bg-neon-green/20 text-neon-green rounded-full">
                  {skill.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
