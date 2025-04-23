import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Check server health
export const checkServerHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return { status: 'online', data: response.data };
  } catch (error) {
    console.error('Server health check failed:', error);
    return { status: 'offline', error };
  }
};

// Check model status
export const checkModelStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/model-status`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Model status check failed:', error);
    return { success: false, error };
  }
};

// Predict using clinical data (MLP model)
export const predictWithClinicalData = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/predict/clinical`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    // Check if server sent fallback data
    if (error.response && error.response.data && error.response.data.fallback_result) {
      return { 
        success: true, 
        data: error.response.data.fallback_result,
        fallback: true 
      };
    }
    
    console.error('Clinical data prediction failed:', error);
    return { success: false, error };
  }
};

// Predict using image (CNN model)
export const predictWithImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await axios.post(`${API_URL}/predict/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    // Check if server sent fallback data
    if (error.response && error.response.data && error.response.data.fallback_result) {
      return { 
        success: true, 
        data: error.response.data.fallback_result,
        fallback: true 
      };
    }
    
    console.error('Image prediction failed:', error);
    return { success: false, error };
  }
};

// Predict using both clinical data and image (Fusion model)
export const predictWithFusion = async (formData, imageFile) => {
  try {
    const fusionFormData = new FormData();
    
    // Add all clinical data as JSON
    fusionFormData.append('clinical_data', JSON.stringify(formData));
    
    // Add image file
    if (imageFile) {
      fusionFormData.append('image', imageFile);
    }
    
    const response = await axios.post(`${API_URL}/predict/fusion`, fusionFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    // Check if server sent fallback data
    if (error.response && error.response.data && error.response.data.fallback_result) {
      return { 
        success: true, 
        data: error.response.data.fallback_result,
        fallback: true 
      };
    }
    
    console.error('Fusion prediction failed:', error);
    return { success: false, error };
  }
}; 