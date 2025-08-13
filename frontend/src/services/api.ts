import axios from 'axios';
import { PredictionResult, ApiResponse } from '../types';

// Configure the base API URL - update this to match your backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 second timeout for image uploads
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || 'Server error';
      
      switch (status) {
        case 400:
          throw new Error(`Bad Request: ${message}`);
        case 413:
          throw new Error('File too large. Please upload a smaller image.');
        case 415:
          throw new Error('Unsupported file type. Please upload a valid image.');
        case 429:
          throw new Error('Too many requests. Please wait and try again.');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(`Error ${status}: ${message}`);
      }
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your connection and try again.');
    } else {
      // Request setup error
      throw new Error('Failed to send request. Please try again.');
    }
  }
);

/**
 * Predict skin disease from uploaded image
 */
export const predictSkinDisease = async (imageFile: File): Promise<PredictionResult> => {
  try {
    // Validate file
    if (!imageFile) {
      throw new Error('No image file provided');
    }

    if (!imageFile.type.startsWith('image/')) {
      throw new Error('Invalid file type. Please upload an image file.');
    }

    if (imageFile.size > 10 * 1024 * 1024) {
      throw new Error('File too large. Please upload an image smaller than 10MB.');
    }

    // Create form data
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('filename', imageFile.name);

    // Make API request
    const response = await apiClient.post<ApiResponse>('/predict', formData);

    // Validate response
    const { predicted_class, confidence } = response.data;
    
    if (!predicted_class) {
      throw new Error('Invalid response: missing predicted_class');
    }

    if (typeof confidence !== 'number' || confidence < 0 || confidence > 1) {
      throw new Error('Invalid response: invalid confidence value');
    }

    return {
      predicted_class,
      confidence,
    };
  } catch (error) {
    // Re-throw with more context if needed
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unexpected error during prediction');
  }
};

/**
 * Health check endpoint
 */
export const healthCheck = async (): Promise<{ status: string }> => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Health check failed');
  }
};

export default apiClient;