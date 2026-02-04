import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

const ManageResume = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await api.get('/resume');
      setResume(response.data);
    } catch (error) {
      console.error('Error fetching resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setMessage('✗ Only PDF, DOC, or DOCX files are allowed');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResume(response.data);
      setMessage('✓ Resume uploaded successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('✗ Failed to upload resume');
      console.error('Error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete the resume?')) return;

    try {
      setUploading(true);
      await api.delete('/resume');
      setResume(null);
      setMessage('✓ Resume deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('✗ Failed to delete resume');
      console.error('Error:', error);
    } finally {
      setUploading(false);
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
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Manage Resume</h1>

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

      <div className="space-y-4 sm:space-y-6">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-4 sm:p-6 rounded-lg border border-neon-green/30"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Upload Resume</h2>
          <label className="block">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              disabled={uploading}
              className="w-full glass px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-neon-green/30 text-gray-400 file:text-neon-green file:bg-neon-green/20 file:border-0 file:rounded file:px-2 sm:file:px-4 file:py-1 sm:file:py-2 file:cursor-pointer disabled:opacity-50 text-xs sm:text-sm file:text-xs sm:file:text-sm"
            />
          </label>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Supported formats: PDF, DOC, DOCX
          </p>
        </motion.div>

        {/* Current Resume Section */}
        {resume && resume.url ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="glass p-4 sm:p-6 rounded-lg border border-neon-green/30"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Current Resume</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-900/50 rounded-lg border border-neon-green/20">
              <div className="min-w-0 flex-1">
                <p className="text-white font-semibold text-sm sm:text-base truncate">{resume.filename}</p>
                {resume.uploaded_at && (
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Uploaded: {new Date(resume.uploaded_at).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                <motion.a
                  href={resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-neon-green/20 border border-neon-green text-neon-green rounded-lg hover:bg-neon-green/30 transition-colors text-xs sm:text-sm flex-1 sm:flex-none"
                >
                  <FiDownload size={16} className="sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Download</span>
                </motion.a>
                <motion.button
                  onClick={handleDelete}
                  disabled={uploading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-red-500/20 border border-red-500 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50 text-xs sm:text-sm flex-1 sm:flex-none"
                >
                  <FiTrash2 size={16} className="sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Delete</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="glass p-6 rounded-lg border border-neon-green/30 text-center"
          >
            <p className="text-gray-400 text-sm sm:text-base">No resume uploaded yet</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ManageResume;
