import React, { useState } from 'react';
import { predictWithFusion } from '../api';
import ClinicalForm from '../components/ClinicalForm';
import ImageUpload from '../components/ImageUpload';
import ResultDisplay from '../components/ResultDisplay';

const FusionDetection = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clinicalData, setClinicalData] = useState(null);
  const [step, setStep] = useState('clinical'); // 'clinical', 'image', or 'result'

  const handleClinicalSubmit = (formData) => {
    setClinicalData(formData);
    setStep('image');
    window.scrollTo(0, 0);
  };

  const handleImageSubmit = async (imageData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const prediction = await predictWithFusion(clinicalData, imageData);
      setResult(prediction);
      setStep('result');
    } catch (err) {
      console.error('Error predicting PCOS with fusion model:', err);
      setError(err.message || 'An error occurred while processing your data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setClinicalData(null);
    setStep('clinical');
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-800">Advanced Fusion Detection</h1>
      
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 mb-8">
        <h2 className="text-xl font-semibold mb-3 text-purple-800">How It Works</h2>
        <p className="text-gray-700">
          The advanced fusion model combines both clinical data and ultrasound imagery for a more
          comprehensive analysis. This may provide more accurate results by analyzing multiple data sources simultaneously.
        </p>
      </div>
      
      {step === 'clinical' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Step 1: Enter Clinical Data</h2>
          <p className="mb-6 text-gray-600">
            First, please enter your clinical data below. After submitting this form, you'll be prompted to upload an ultrasound image.
          </p>
          <ClinicalForm onFormSubmit={handleClinicalSubmit} isLoading={loading} />
        </div>
      )}
      
      {step === 'image' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Step 2: Upload Ultrasound Image</h2>
          <p className="mb-6 text-gray-600">
            Now, please upload a clear, high-quality ultrasound image of your ovaries.
          </p>
          <ImageUpload onImageUpload={handleImageSubmit} isLoading={loading} />
          
          <div className="mt-6 flex justify-between">
            <button 
              onClick={() => setStep('clinical')}
              className="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Clinical Data
            </button>
          </div>
        </div>
      )}
      
      {loading && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
          <p className="mt-2 text-gray-600">Analyzing your clinical data and ultrasound image...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8 relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <div className="mt-3">
            <button 
              onClick={resetForm}
              className="text-red-700 font-medium underline"
            >
              Start over
            </button>
          </div>
        </div>
      )}

      {step === 'result' && result && (
        <div className="mb-8">
          <ResultDisplay result={result} />
          <div className="mt-6 text-center">
            <button 
              onClick={resetForm}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Start New Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FusionDetection; 