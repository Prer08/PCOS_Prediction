import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ClinicalDetection from './pages/ClinicalDetection';
import UltrasoundDetection from './pages/UltrasoundDetection';
import FusionDetection from './pages/FusionDetection';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors duration-200">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8 md:px-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clinical" element={<ClinicalDetection />} />
              <Route path="/ultrasound" element={<UltrasoundDetection />} />
              <Route path="/fusion" element={<FusionDetection />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 