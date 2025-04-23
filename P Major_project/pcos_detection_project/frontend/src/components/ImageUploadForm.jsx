import React from 'react';
import ImageUpload from './ImageUpload';

// This wrapper component reuses the existing ImageUpload with different prop names
const ImageUploadForm = ({ onSubmit, isLoading }) => {
  // Simply forward the props to ImageUpload
  return <ImageUpload onImageUpload={onSubmit} isLoading={isLoading} />;
};

export default ImageUploadForm; 