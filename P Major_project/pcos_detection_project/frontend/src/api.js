import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Function to predict using MLP model (clinical features only)
export const predictWithMLP = async (clinicalData) => {
  try {
    const response = await axios.post(`${API_URL}/predict_mlp`, clinicalData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to get prediction from server');
  }
};

// Function to predict using CNN model (image only)
export const predictWithCNN = async (imageBase64) => {
  try {
    // The backend currently doesn't use the image data, but we'll send it anyway
    // for compatibility with future implementations
    const response = await axios.post(`${API_URL}/predict_cnn`, {
      image: imageBase64
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to process image');
  }
};

// Function to predict using Fusion model (both clinical features and image)
export const predictWithFusion = async (clinicalData, imageBase64) => {
  try {
    const response = await axios.post(`${API_URL}/predict_fusion`, {
      clinical_data: clinicalData,
      image: imageBase64
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to process fusion data');
  }
};

// Predict PCOS based on clinical data
export const predictPCOS = async (formData) => {
  return predictWithMLP(formData);
};

// Predict PCOS based on ultrasound image
export const predictPCOSFromImage = async (imageFile) => {
  return predictWithCNN(imageFile);
};

// Check server health
export const checkServerHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data.status === 'healthy';
  } catch (error) {
    return false;
  }
};

// Function to check the status of the models
export const checkModelStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/model_status`);
    return response.data;
  } catch (error) {
    console.error('Model status check failed:', error);
    return {
      mlp_model: { file_exists: false, pytorch_available: false, fallback_available: false },
      cnn_model: { file_exists: false, pytorch_available: false, fallback_available: false },
      fusion_model: { file_exists: false, pytorch_available: false, fallback_available: false }
    };
  }
}; 