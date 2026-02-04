import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiPlus } from 'react-icons/fi';
import api from '../../services/api';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tech: '',
    github: '',
    live: '',
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) {
      setMessage('✗ Title and description are required');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', newProject.title);
      formData.append('description', newProject.description);
      
      const techArray = newProject.tech
        ? newProject.tech.split(',').map((t) => t.trim()).filter((t) => t.length > 0)
        : [];
      formData.append('tech', techArray.join(','));
      formData.append('github', newProject.github || '');
      formData.append('live', newProject.live || '');
      
      if (newProject.image) {
        formData.append('file', newProject.image);
      }

      const response = await api.post('/projects', formData);
      
      setProjects([...projects, response.data]);
      setNewProject({
        title: '',
        description: '',
        tech: '',
        github: '',
        live: '',
        image: null,
      });
      setMessage('✓ Project added successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error:', error);
      let errorMsg = 'Unknown error';
      if (error.response?.data?.detail) {
        if (typeof error.response.data.detail === 'string') {
          errorMsg = error.response.data.detail;
        } else if (Array.isArray(error.response.data.detail)) {
          errorMsg = error.response.data.detail.map(e => e.msg || e).join(', ');
        }
      } else {
        errorMsg = error.message;
      }
      setMessage('✗ Failed to add project: ' + errorMsg);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        setProjects(projects.filter((p) => p.id !== id));
        setMessage('✓ Project deleted!');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('✗ Failed to delete project');
      }
    }
  };

  if (loading) return <div className="text-neon-green">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl w-full mx-auto px-3 sm:px-0"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Manage Projects</h1>

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
        {/* Add Project Form */}
        <form onSubmit={handleAddProject} className="glass p-6 rounded-lg border border-neon-green/30 space-y-4 h-fit">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FiPlus className="text-neon-green" />
            Add New Project
          </h2>

          <input
            type="text"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            className="w-full glass px-4 py-2 rounded-lg border border-neon-green/30 text-white placeholder-gray-600"
          />

          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            rows="4"
            className="w-full glass px-4 py-2 rounded-lg border border-neon-green/30 text-white placeholder-gray-600 resize-none"
          />

          <input
            type="text"
            placeholder="Technologies (comma separated, optional)"
            value={newProject.tech}
            onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
            className="w-full glass px-4 py-2 rounded-lg border border-neon-green/30 text-white placeholder-gray-600"
          />

          <input
            type="url"
            placeholder="GitHub Link (optional)"
            value={newProject.github}
            onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
            className="w-full glass px-4 py-2 rounded-lg border border-neon-green/30 text-white placeholder-gray-600"
          />

          <input
            type="url"
            placeholder="Live Demo Link (optional)"
            value={newProject.live}
            onChange={(e) => setNewProject({ ...newProject, live: e.target.value })}
            className="w-full glass px-4 py-2 rounded-lg border border-neon-green/30 text-white placeholder-gray-600"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewProject({ ...newProject, image: e.target.files[0] })}
            className="w-full glass px-4 py-2 rounded-lg border border-neon-green/30 text-gray-400"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            className="w-full py-2 bg-neon-green text-black font-bold rounded-lg"
          >
            Add Project
          </motion.button>
        </form>

        {/* Projects List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Projects ({projects.length})</h2>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ x: 5 }}
                className="glass p-4 rounded-lg border border-neon-green/30"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-white font-semibold">{project.title}</p>
                    <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {project.tech?.map((t, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-neon-green/20 text-neon-green rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-400 hover:text-red-500 ml-4"
                  >
                    <FiTrash2 />
                  </motion.button>
                </div>
              </motion.div>
            ))}
            {projects.length === 0 && (
              <p className="text-gray-400 text-center py-8">No projects yet</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ManageProjects;
