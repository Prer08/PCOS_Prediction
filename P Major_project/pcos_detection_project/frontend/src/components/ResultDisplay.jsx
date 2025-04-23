import React, { useEffect, useState } from 'react';

const ResultDisplay = ({ result }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Add a slight delay before showing results for animation effect
    const timer = setTimeout(() => {
      setShow(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  if (!result) return null;

  const { prediction, probability } = result;
  const isPCOS = prediction === 1 || prediction === true;
  const probabilityPercentage = typeof probability === 'number' 
    ? Math.round(probability * 100) 
    : 'N/A';

  // Determine risk level based on probability
  let riskLevel = 'Unknown';
  let riskBarClass = "bg-gray-500";
  let riskTextClass = "text-gray-700 dark:text-gray-400";
  
  if (typeof probability === 'number') {
    if (probability >= 0.75) {
      riskLevel = 'High';
      riskBarClass = "bg-red-500";
      riskTextClass = "text-red-700 dark:text-red-400";
    } else if (probability >= 0.5) {
      riskLevel = 'Moderate';
      riskBarClass = "bg-orange-500";
      riskTextClass = "text-orange-700 dark:text-orange-400";
    } else if (probability >= 0.25) {
      riskLevel = 'Low';
      riskBarClass = "bg-yellow-500";
      riskTextClass = "text-yellow-700 dark:text-yellow-400";
    } else {
      riskLevel = 'Very Low';
      riskBarClass = "bg-green-500";
      riskTextClass = "text-green-700 dark:text-green-400";
    }
  }

  return (
    <div className={`mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-500 transform ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Analysis Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`animate-fade-in transition-all duration-700 delay-150 ${show ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Prediction</h3>
          <div className={`px-4 py-3 rounded-lg ${isPCOS ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
            <p className={`text-xl font-bold ${isPCOS ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>
              {isPCOS ? '✅ PCOS Detected' : '❌ No PCOS Detected'}
            </p>
            <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
              This assessment is based on the provided information and should be confirmed by healthcare professionals.
            </p>
          </div>
        </div>
        
        <div className={`animate-fade-in transition-all duration-700 delay-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Risk Assessment</h3>
          <div className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${riskBarClass} transition-all duration-1000 ease-out`} 
                  style={{ width: show ? `${probabilityPercentage}%` : '0%' }}
                ></div>
              </div>
              <span className="ml-3 text-sm font-medium dark:text-white">{probabilityPercentage}%</span>
            </div>
            <p className={`text-sm mt-2 font-semibold ${riskTextClass}`}>
              {riskLevel} Risk Level
            </p>
          </div>
        </div>
      </div>
      
      <div className={`mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-sm text-gray-500 dark:text-gray-300 animate-fade-in transition-all duration-700 delay-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
        <p className="font-medium mb-1">Important Notice:</p>
        <p>
          This tool provides an estimation based on the information provided and is not a definitive diagnosis.
          Machine learning models have limitations and may not capture all aspects of your health condition.
        </p>
        <p className="mt-2">
          Always consult with a healthcare provider for proper diagnosis and treatment. If you are experiencing 
          symptoms, please seek medical attention promptly.
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay; 