import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../../services/api';

const ManageExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [newExp, setNewExp] = useState({
    title: '',
    company: '',
    duration: '',
    description: '',
    highlights: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await api.get('/experience');
      setExperiences(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExperience = async (e) => {
    e.preventDefault();
    if (!newExp.title || !newExp.company) {
      setMessage('✗ Title and company are required');
      return;
    }

    try {
      const response = await api.post('/experience', {
        ...newExp,
        highlights: newExp.highlights.split(',').map((h) => h.trim()),
      });
      setExperiences([...experiences, response.data]);
      setNewExp({
        title: '',
        company: '',
        duration: '',
        description: '',
        highlights: '',
      });
      setMessage('✓ Experience added!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('✗ Failed to add experience');
    }
  };

  const handleDeleteExperience = async (id) => {
    if (window.confirm('Delete this experience?')) {
      try {
        await api.delete(`/experience/${id}`);
        setExperiences(experiences.filter((e) => e.id !== id));
        setMessage('✓ Experience deleted!');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('✗ Failed to delete');
      }
    }
  };

  if (loading) return <div className="text-neon-green">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl w-full mx-auto px-3 sm:px-0">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Manage Experience</h1>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <form onSubmit={handleAddExperience} className="glass p-4 sm:p-6 rounded-lg border border-neon-green/30 space-y-3 sm:space-y-4 h-fit">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FiPlus className="text-neon-green" />
            Add Experience
          </h2>

          <input
            type="text"
            placeholder="Job Title"
            value={newExp.title}
            onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
            className="w-full glass px-3 sm:px-4 py-2 rounded-lg border border-neon-green/30 text-white text-sm placeholder-gray-600"
          />

          <input
            type="text"
            placeholder="Company Name"
            value={newExp.company}
            onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
            className="w-full glass px-3 sm:px-4 py-2 rounded-lg border border-neon-green/30 text-white text-sm placeholder-gray-600"
          />

          <input
            type="text"
            placeholder="Duration (e.g., Jan 2023 - Present)"
            value={newExp.duration}
            onChange={(e) => setNewExp({ ...newExp, duration: e.target.value })}
            className="w-full glass px-3 sm:px-4 py-2 rounded-lg border border-neon-green/30 text-white text-sm placeholder-gray-600"
          />

          <textarea
            placeholder="Description"
            value={newExp.description}
            onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
            rows="4"
            className="w-full glass px-3 sm:px-4 py-2 rounded-lg border border-neon-green/30 text-white resize-none text-sm placeholder-gray-600"
          />

          <input
            type="text"
            placeholder="Highlights (comma separated)"
            value={newExp.highlights}
            onChange={(e) => setNewExp({ ...newExp, highlights: e.target.value })}
            className="w-full glass px-3 sm:px-4 py-2 rounded-lg border border-neon-green/30 text-white text-sm placeholder-gray-600"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            className="w-full py-2 bg-neon-green text-black font-bold rounded-lg text-sm sm:text-base"
          >
            Add Experience
          </motion.button>
        </form>

        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">Experiences ({experiences.length})</h2>
          <div className="space-y-2 sm:space-y-3 max-h-[600px] overflow-y-auto">
            {experiences.map((exp) => (
              <motion.div key={exp.id} whileHover={{ x: 5 }} className="glass p-3 sm:p-4 rounded-lg border border-neon-green/30">
                <div className="flex justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm sm:text-base truncate">{exp.title}</p>
                    <p className="text-neon-green text-xs sm:text-sm truncate">{exp.company}</p>
                    <p className="text-gray-400 text-xs mt-1">{exp.duration}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="text-red-400 flex-shrink-0"
                  >
                    <FiTrash2 />
                  </motion.button>
                </div>
              </motion.div>
            ))}
            {experiences.length === 0 && <p className="text-gray-400 text-center py-8 text-sm">No experiences</p>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ManageExperience;
