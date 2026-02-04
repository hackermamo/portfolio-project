import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaGithub, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import api from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await api.get('/contact-info');
      setContactInfo(response.data);
    } catch (error) {
      console.error('Error fetching contact info:', error);
      // Set default contact info
      setContactInfo({
        email: 'parthiv@example.com',
        phone: '+91-XXXXXXXXXX',
        location: 'India',
        whatsapp: 'https://wa.me/91XXXXXXXXXX',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/contact', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
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
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <div className="text-neon-green text-2xl">Loading...</div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative min-h-screen flex items-center py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl" />
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
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Let's </span>
            <span className="neon-text">Connect</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out.
            I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div variants={containerVariants} className="space-y-6">
            {/* Contact Cards */}
            {[
              {
                icon: FaEnvelope,
                label: 'Email',
                value: contactInfo?.email,
                link: `mailto:${contactInfo?.email}`,
              },
              {
                icon: FaPhone,
                label: 'Phone',
                value: contactInfo?.phone,
                link: `tel:${contactInfo?.phone}`,
              },
              {
                icon: FaMapMarkerAlt,
                label: 'Location',
                value: contactInfo?.location,
                link: '#',
              },
              {
                icon: FaWhatsapp,
                label: 'WhatsApp',
                value: 'Contact via WhatsApp',
                link: contactInfo?.whatsapp,
              },
            ].map(({ icon: Icon, label, value, link }, idx) => (
              <motion.a
                key={idx}
                href={link}
                target={link.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="glass p-6 rounded-lg border border-neon-green/30 hover:border-neon-green/70 transition-all flex items-start gap-4 group"
              >
                <div className="text-neon-green text-2xl mt-1 group-hover:scale-110 transition-transform">
                  <Icon />
                </div>
                <div>
                  <p className="text-neon-secondary font-semibold text-sm uppercase tracking-wider">
                    {label}
                  </p>
                  <p className="text-white font-semibold mt-1">{value}</p>
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <motion.div variants={itemVariants} className="pt-4">
              <p className="text-neon-secondary font-semibold text-sm uppercase tracking-wider mb-4">
                Follow Me
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: FaInstagram, label: 'Instagram', url: 'https://www.instagram.com/mr_official_maman' },
                  { Icon: FaLinkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/maman-das-6934342b1' },
                  { Icon: FaYoutube, label: 'YouTube', url: 'https://youtube.com/@tripurajobstudyinformation11' },
                  { Icon: FaGithub, label: 'GitHub', url: 'https://github.com/hackermamo' },
                ].map(({ Icon, label, url }, idx) => (
                  <motion.a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 glass rounded-lg border border-neon-green/30 hover:border-neon-green/70 flex items-center justify-center text-xl text-neon-green hover:text-neon-green transition-all"
                    title={label}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            className="space-y-6"
          >
            {/* Name Input */}
            <motion.div variants={itemVariants}>
              <label className="text-white font-semibold text-sm uppercase tracking-wider mb-2 block">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Parthiv"
                className="w-full glass px-4 py-3 rounded-lg border border-neon-green/30 focus:border-neon-green text-white placeholder-gray-600 focus:outline-none transition-colors"
              />
            </motion.div>

            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <label className="text-white font-semibold text-sm uppercase tracking-wider mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
                className="w-full glass px-4 py-3 rounded-lg border border-neon-green/30 focus:border-neon-green text-white placeholder-gray-600 focus:outline-none transition-colors"
              />
            </motion.div>

            {/* Subject Input */}
            <motion.div variants={itemVariants}>
              <label className="text-white font-semibold text-sm uppercase tracking-wider mb-2 block">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder="Project or Inquiry"
                className="w-full glass px-4 py-3 rounded-lg border border-neon-green/30 focus:border-neon-green text-white placeholder-gray-600 focus:outline-none transition-colors"
              />
            </motion.div>

            {/* Message Textarea */}
            <motion.div variants={itemVariants}>
              <label className="text-white font-semibold text-sm uppercase tracking-wider mb-2 block">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Tell me about your project..."
                rows="5"
                className="w-full glass px-4 py-3 rounded-lg border border-neon-green/30 focus:border-neon-green text-white placeholder-gray-600 focus:outline-none transition-colors resize-none"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-6 py-3 bg-neon-green text-black font-bold rounded-lg hover:shadow-neon-glow-lg transition-shadow"
            >
              Send Message
            </motion.button>

            {/* Success Message */}
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-neon-green text-center font-semibold"
              >
                ✓ Message sent successfully!
              </motion.p>
            )}
          </motion.form>
        </div>
      </motion.div>

      {/* WhatsApp Floating Button */}
      <motion.a
        href={contactInfo?.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-neon-green text-black rounded-full flex items-center justify-center shadow-neon-glow-lg hover:shadow-neon-glow-lg transition-shadow cursor-pointer text-3xl z-40"
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp />
      </motion.a>
    </section>
  );
};

export default Contact;
