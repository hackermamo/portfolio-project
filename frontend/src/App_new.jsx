import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Resume from './components/Resume';
import Contact from './components/Contact';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* Main Portfolio Routes */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Resume />
              <Contact />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-black/50 border-t border-neon-green/20 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Maman Das. All rights reserved.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Designed & Built with <span className="text-neon-green">❤</span> using React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}

export default App;
