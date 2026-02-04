import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await api.get('/experience');
      setExperiences(response.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      // Set default experiences if API fails
      setExperiences([
        {
          id: 1,
          title: 'Senior UI/UX Designer',
          company: 'Tech Startup Inc',
          duration: 'Jan 2023 - Present',
          description: 'Led design for multiple client projects, created design systems, and mentored junior designers.',
          highlights: ['Design System', 'Client Management', 'Team Leadership'],
        },
        {
          id: 2,
          title: 'Freelance Graphic Designer',
          company: 'Self-Employed',
          duration: 'Jan 2020 - Present',
          description: 'Created branding, logos, and digital creatives for startups and established brands.',
          highlights: ['Branding', 'Logo Design', 'Digital Creatives'],
        },
        {
          id: 3,
          title: 'Design Intern',
          company: 'Creative Agency Co.',
          duration: 'Jun 2021 - Dec 2021',
          description: 'Assisted in designing marketing materials and learning design principles.',
          highlights: ['UI Design', 'Brand Guidelines', 'Design Tools'],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  if (loading) {
    return (
      <section id="experience" className="min-h-screen flex items-center justify-center">
        <div className="text-neon-green text-2xl">Loading...</div>
      </section>
    );
  }

  return (
    <section id="experience" className="relative min-h-screen flex items-center py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-neon-green font-semibold text-sm tracking-widest uppercase mb-4">
            Career Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-white">My </span>
            <span className="neon-text">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div variants={containerVariants} className="space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline dot and line */}
              <div className="absolute left-0 top-0 flex items-center">
                <div className="w-4 h-4 bg-neon-green rounded-full shadow-neon-glow" />
                {idx !== experiences.length - 1 && (
                  <div className="absolute left-2 top-4 w-0.5 h-32 bg-gradient-to-b from-neon-green to-transparent" />
                )}
              </div>

              {/* Content */}
              <motion.div
                whileHover={{ x: 10 }}
                className="ml-12 glass p-6 rounded-lg border border-neon-green/30 hover:border-neon-green/70 transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <span className="text-neon-green text-sm font-semibold mt-2 md:mt-0">
                    {exp.duration}
                  </span>
                </div>

                <p className="text-neon-secondary font-semibold mb-3">{exp.company}</p>
                <p className="text-gray-400 mb-4">{exp.description}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 bg-neon-green/20 text-neon-green rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;
