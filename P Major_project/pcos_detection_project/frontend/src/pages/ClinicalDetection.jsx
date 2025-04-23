import React, { useState } from 'react';
import { predictWithMLP } from '../api';
import ClinicalForm from '../components/ClinicalForm';
import ResultDisplay from '../components/ResultDisplay';

const ClinicalDetection = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const prediction = await predictWithMLP(formData);
      setResult(prediction);
    } catch (err) {
      console.error('Error predicting PCOS:', err);
      setError(err.message || 'An error occurred while processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-800">Clinical Data Detection</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="mb-6 text-gray-600">
          Enter your clinical data below to receive a preliminary assessment for PCOS indicators.
          All fields are required for the most accurate results.
        </p>
        
        <ClinicalForm onFormSubmit={handleFormSubmit} isLoading={loading} />
        
        {loading && (
          <div className="mt-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
            <p className="mt-2 text-gray-600">Analyzing your data...</p>
          </div>
        )}

        {error && (
          <div className="mt-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {result && <ResultDisplay result={result} />}
      </div>
      
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
        <h2 className="text-xl font-semibold mb-3 text-purple-800">Important Information</h2>
        <p className="text-gray-700 mb-3">
          The clinical data model analyzes various metrics including hormone levels, 
          body measurements, and symptoms to identify patterns associated with PCOS.
        </p>
        <p className="text-gray-700">
          This assessment is not a medical diagnosis. Results should be discussed with 
          a healthcare professional for proper evaluation and treatment options.
        </p>
      </div>
    </div>
  );
};

export default ClinicalDetection; 