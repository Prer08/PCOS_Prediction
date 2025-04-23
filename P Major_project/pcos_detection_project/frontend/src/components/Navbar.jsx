import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ appName = "OvaDetect" }) => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <header className={`bg-white dark:bg-gray-900 shadow-md transition-colors duration-200 ${darkMode ? 'dark-mode' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-purple-800 dark:text-purple-400">{appName}</Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/" 
               className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Home
            </Link>
            <Link to="/clinical" 
               className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Clinical Detection
            </Link>
            <Link to="/ultrasound" 
               className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Ultrasound Detection
            </Link>
            <Link to="/fusion" 
               className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Advanced
            </Link>
            <Link to="/about" 
               className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              About
            </Link>
            <div className="ml-4 border-l dark:border-gray-700 pl-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 