import React, { useState, useRef } from 'react';

const ImageUpload = ({ onImageUpload, isLoading }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // Reset states
    setError('');
    setPreviewImage(null);
    
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      setError('Please select an image file');
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!previewImage) {
      setError('Please upload an ultrasound image');
      return;
    }
    
    onImageUpload(previewImage);
  };

  const handleClickUpload = () => {
    // Trigger the file input click
    fileInputRef.current.click();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Ultrasound Image Upload</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        
        {/* Drop zone / upload area */}
        <div 
          onClick={handleClickUpload}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
        >
          {previewImage ? (
            <div className="flex flex-col items-center">
              <img 
                src={previewImage} 
                alt="Ultrasound preview" 
                className="max-h-64 max-w-full mb-4 rounded-lg shadow-sm" 
              />
              <p className="text-sm text-gray-500">Click to change image</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <svg 
                className="w-12 h-12 mb-3 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-2 text-sm text-gray-600">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, or JPEG (max. 5MB)
              </p>
            </div>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <div className="mt-2 text-sm text-red-600">
            {error}
          </div>
        )}
        
        {/* Submit button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            disabled={!previewImage || isLoading}
          >
            {isLoading ? 'Processing...' : 'Submit Image'}
          </button>
        </div>
      </form>
      
      {/* Instructions */}
      <div className="mt-4 text-sm text-gray-600">
        <h3 className="font-medium mb-1">Tips for best results:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use clear, high-quality ultrasound images</li>
          <li>Ensure the ovaries are visible in the image</li>
          <li>Grayscale images are preferred</li>
          <li>Avoid images with excessive text overlays</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUpload;
