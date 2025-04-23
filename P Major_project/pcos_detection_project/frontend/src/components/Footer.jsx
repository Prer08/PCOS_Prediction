import React from 'react';

const Footer = ({ appName = "OvaDetect" }) => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} {appName}. For educational purposes only.
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 md:mt-0">
            Not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 