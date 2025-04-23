import React from 'react';
import ClinicalForm from './ClinicalForm';

// This wrapper component reuses the existing ClinicalForm with different prop names
const InputForm = ({ onSubmit, isLoading }) => {
  // Simply forward the props to ClinicalForm
  return <ClinicalForm onFormSubmit={onSubmit} isLoading={isLoading} />;
};

export default InputForm; 