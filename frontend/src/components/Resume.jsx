import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaFile } from 'react-icons/fa';
import api from '../services/api';

const Resume = () => {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await api.get('/resume');
      console.log('Resume API Response:', response.data);
      // Check if response has url field and it's not null
      if (response.data.url) {
        setResumeUrl(response.data.url);
        console.log('Resume URL set to:', response.data.url);
      } else {
        console.log('No resume URL in response');
        setResumeUrl(null);
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
      setResumeUrl(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (resumeUrl) {
      console.log('Downloading from:', resumeUrl);
      // Use backend API URL for download
      const fullUrl = resumeUrl.startsWith('http') ? resumeUrl : `http://localhost:8000${resumeUrl}`;
      const link = document.createElement('a');
      link.href = fullUrl;
      link.download = 'Resume.pdf';
      link.click();
    }
  };

  const handleOpenResume = () => {
    if (resumeUrl) {
      console.log('Opening resume from:', resumeUrl);
      // Use backend API URL to open
      const fullUrl = resumeUrl.startsWith('http') ? resumeUrl : `http://localhost:8000${resumeUrl}`;
      window.open(fullUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <section id="resume" className="min-h-screen flex items-center justify-center">
        <div className="text-neon-green text-2xl">Loading...</div>
      </section>
    );
  }

  return (
    <section id="resume" className="relative min-h-screen flex items-center py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl -translate-x-1/2" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-neon-green font-semibold text-sm tracking-widest uppercase mb-4">
            Download My CV
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-white">My </span>
            <span className="neon-text">Resume</span>
          </h2>
        </motion.div>

        {/* Resume Preview Card */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Left: Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Maman Das</h3>
              <p className="text-neon-green font-semibold">Creative Designer & Full-Stack Developer</p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-neon-secondary font-semibold text-sm uppercase tracking-wider mb-2">
                  Education
                </p>
                <p className="text-white font-semibold">Bachelor's in Computer Science & Engineering</p>
                <p className="text-gray-400 text-sm">Pursuing</p>
              </div>

              <div>
                <p className="text-neon-secondary font-semibold text-sm uppercase tracking-wider mb-2">
                  Specializations
                </p>
                <div className="flex flex-wrap gap-2">
                  {['UI/UX Design', 'Branding', 'Full Stack', 'React', 'Python'].map((spec, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 bg-neon-green/20 text-neon-green rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Download Button */}
            <motion.button
              onClick={handleDownload}
              disabled={!resumeUrl}
              whileHover={resumeUrl ? { scale: 1.05 } : {}}
              whileTap={resumeUrl ? { scale: 0.95 } : {}}
              className="w-full px-6 py-4 bg-neon-green text-black font-bold rounded-lg hover:shadow-neon-glow-lg transition-shadow flex items-center justify-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaDownload size={20} />
              {resumeUrl ? 'Download Resume' : 'No Resume Available'}
            </motion.button>
          </div>

          {/* Right: Resume Preview */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass p-8 rounded-lg border border-neon-green/30 hover:border-neon-green/70 transition-all"
          >
            <div className="flex items-center gap-4 mb-6">
              <FaFile className="text-neon-green text-4xl" />
              <div>
                <p className="text-white font-semibold">Resume Document</p>
                <p className="text-gray-400 text-sm">PDF Format</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800 h-40 rounded-lg flex items-center justify-center overflow-hidden">
                {resumeUrl ? (
                  <iframe
                    src={`http://localhost:8000${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full"
                    title="Resume Preview"
                  />
                ) : (
                  <p className="text-gray-500 text-center">Resume not available</p>
                )}
              </div>

            <motion.button
              onClick={handleOpenResume}
              disabled={!resumeUrl}
              whileHover={resumeUrl ? { scale: 1.05 } : {}}
              whileTap={resumeUrl ? { scale: 0.95 } : {}}
              className="w-full px-4 py-3 border-2 border-neon-green text-neon-green font-bold rounded-lg hover:bg-neon-green/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resumeUrl ? 'Open Resume' : 'No Resume Available'}
            </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { title: '4+ Years', subtitle: 'Design Experience' },
            { title: '50+', subtitle: 'Projects Completed' },
            { title: '30+', subtitle: 'Happy Clients' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="glass p-6 rounded-lg border border-neon-green/30 hover:border-neon-green/70 transition-all text-center"
            >
              <p className="text-3xl font-bold neon-text mb-2">{stat.title}</p>
              <p className="text-gray-400">{stat.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Resume;
