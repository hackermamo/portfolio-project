import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import api from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Set default projects if API fails
      setProjects([
        {
          id: 1,
          title: 'Portfolio Website',
          description: 'A modern, responsive portfolio website with admin panel for easy content management.',
          image: '/api/placeholder/400/300',
          tech: ['React', 'Tailwind CSS', 'FastAPI', 'MongoDB'],
          github: 'https://github.com',
          live: 'https://example.com',
        },
        {
          id: 2,
          title: 'E-Commerce Platform',
          description: 'Full-stack e-commerce platform with payment integration and inventory management.',
          image: '/api/placeholder/400/300',
          tech: ['React', 'Python', 'PostgreSQL', 'Stripe'],
          github: 'https://github.com',
          live: 'https://example.com',
        },
        {
          id: 3,
          title: 'Task Management App',
          description: 'Collaborative task management application with real-time updates and team features.',
          image: '/api/placeholder/400/300',
          tech: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
          github: 'https://github.com',
          live: 'https://example.com',
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  if (loading) {
    return (
      <section id="projects" className="min-h-screen flex items-center justify-center">
        <div className="text-neon-green text-2xl">Loading...</div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative min-h-screen flex items-center py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-neon-green font-semibold text-sm tracking-widest uppercase mb-4">
            My Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-white">Featured </span>
            <span className="neon-text">Projects</span>
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group glass rounded-lg overflow-hidden border border-neon-green/30 hover:border-neon-green/70 transition-all"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48 bg-gray-900">
                <img
                  src={project.image || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%2300ff00%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22%23000%22%3ENo Image%3C/text%3E%3C/svg%3E'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 bg-neon-green/20 text-neon-green rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-neon-green hover:text-neon-secondary transition-colors"
                  >
                    <FaGithub size={20} />
                    <span className="text-sm">Code</span>
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-neon-green hover:text-neon-secondary transition-colors"
                  >
                    <FaExternalLinkAlt size={20} />
                    <span className="text-sm">Live</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
