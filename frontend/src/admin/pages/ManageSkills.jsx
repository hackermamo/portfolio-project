import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../../services/api';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 50,
    category: 'frontend',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await api.get('/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name) {
      setMessage('✗ Skill name is required');
      return;
    }

    try {
      const response = await api.post('/skills', newSkill);
      setSkills([...skills, response.data]);
      setNewSkill({ name: '', level: 50, category: 'frontend' });
      setMessage('✓ Skill added successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('✗ Failed to add skill');
      console.error('Error:', error);
    }
  };

  const handleDeleteSkill = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await api.delete(`/skills/${id}`);
        setSkills(skills.filter((s) => s.id !== id));
        setMessage('✓ Skill deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('✗ Failed to delete skill');
        console.error('Error:', error);
      }
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
      className="max-w-4xl w-full mx-auto px-3 sm:px-0"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Manage Skills</h1>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
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
        {/* Add New Skill */}
        <motion.form
          onSubmit={handleAddSkill}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-4 sm:p-6 rounded-lg border border-neon-green/30 space-y-3 sm:space-y-4"
        >
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FiPlus className="text-neon-green" />
            Add New Skill
          </h2>

          <div>
            <label className="block text-white font-semibold text-xs sm:text-sm mb-2">
              Skill Name
            </label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) =>
                setNewSkill((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g., React"
              className="w-full glass px-3 sm:px-4 py-2 sm:py-2 rounded-lg border border-neon-green/30 focus:border-neon-green text-white focus:outline-none transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-white font-semibold text-xs sm:text-sm mb-2">
              Proficiency Level: {newSkill.level}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={newSkill.level}
              onChange={(e) =>
                setNewSkill((prev) => ({ ...prev, level: parseInt(e.target.value) }))
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-white font-semibold text-xs sm:text-sm mb-2">
              Category
            </label>
            <select
              value={newSkill.category}
              onChange={(e) =>
                setNewSkill((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full glass px-3 sm:px-4 py-2 sm:py-2 rounded-lg border border-neon-green/30 focus:border-neon-green text-white focus:outline-none transition-colors bg-black/30 text-sm"
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="tools">Tools</option>
              <option value="design">Design</option>
            </select>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 bg-neon-green text-black font-bold rounded-lg hover:shadow-neon-glow transition-shadow"
          >
            Add Skill
          </motion.button>
        </motion.form>

        {/* Skills List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3 sm:space-y-4"
        >
          <h2 className="text-lg sm:text-xl font-bold text-white">Current Skills ({skills.length})</h2>
          <div className="space-y-2 sm:space-y-3 max-h-96 overflow-y-auto pr-2">
            {skills.map((skill) => (
              <motion.div
                key={skill.id}
                whileHover={{ x: 5 }}
                className="glass p-3 sm:p-4 rounded-lg border border-neon-green/30 flex justify-between items-center text-sm sm:text-base"
              >
                <div className="flex-1">
                  <p className="text-white font-semibold">{skill.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-neon-green"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-neon-green text-sm font-bold w-12 text-right">
                      {skill.level}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 uppercase tracking-wider">
                    {skill.category}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteSkill(skill.id)}
                  className="ml-4 text-red-400 hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <FiTrash2 size={20} />
                </motion.button>
              </motion.div>
            ))}
            {skills.length === 0 && (
              <p className="text-gray-400 text-center py-8">No skills added yet</p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ManageSkills;
