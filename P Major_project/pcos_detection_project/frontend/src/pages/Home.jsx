import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-purple-800 dark:text-purple-400">Welcome to OvaDetect</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          A machine learning approach to early detection of Polycystic Ovary Syndrome
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors duration-200">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">About PCOS/PCOD</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Polycystic Ovary Syndrome (PCOS) is a hormonal disorder common among women of reproductive age.
          Early detection can significantly improve management and reduce long-term health complications.
        </p>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          OvaDetect uses advanced machine learning algorithms to help identify potential PCOS indicators
          through clinical data analysis and ultrasound image processing.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">Choose Detection Method</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          to="/clinical" 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 transform hover:scale-[1.03] dark:hover:bg-gray-700"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Detect using Clinical Data</h3>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
              Enter your clinical measurements and symptoms for analysis.
            </p>
            <button className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors">
              Get Started
            </button>
          </div>
        </Link>

        <Link 
          to="/ultrasound" 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 transform hover:scale-[1.03] dark:hover:bg-gray-700"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Detect using Ultrasound</h3>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
              Upload an ultrasound image for automated analysis.
            </p>
            <button className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors">
              Upload Image
            </button>
          </div>
        </Link>
      </div>

      <div className="mt-8 text-center mb-8">
        <Link 
          to="/fusion" 
          className="inline-flex items-center text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 transition-colors"
        >
          <span>Try our advanced detection with both clinical and image data</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Home; 