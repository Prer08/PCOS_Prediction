import React, { useState } from 'react';
import { predictWithCNN } from '../api';
import ImageUpload from '../components/ImageUpload';
import ResultDisplay from '../components/ResultDisplay';

const UltrasoundDetection = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageSubmit = async (imageData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const prediction = await predictWithCNN(imageData);
      setResult(prediction);
    } catch (err) {
      console.error('Error predicting PCOS from image:', err);
      setError(err.message || 'An error occurred while processing your image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-800">Ultrasound Image Detection</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="mb-6 text-gray-600">
          Upload an ultrasound image to receive a preliminary assessment for PCOS indicators.
          For best results, use a clear, high-quality ovarian ultrasound image.
        </p>
        
        <ImageUpload onImageUpload={handleImageSubmit} isLoading={loading} />
        
        {loading && (
          <div className="mt-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
            <p className="mt-2 text-gray-600">Analyzing your ultrasound image...</p>
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
        <h2 className="text-xl font-semibold mb-3 text-purple-800">How It Works</h2>
        <p className="text-gray-700 mb-3">
          Our Convolutional Neural Network (CNN) model analyzes ultrasound images to detect 
          features typically associated with polycystic ovaries, such as increased follicle count,
          peripheral distribution of follicles, and increased ovarian volume.
        </p>
        <p className="text-gray-700">
          This assessment is not a medical diagnosis. For proper evaluation and treatment options,
          please consult with a healthcare professional who can interpret ultrasound results in the 
          context of your complete medical history.
        </p>
      </div>
    </div>
  );
};

export default UltrasoundDetection; 