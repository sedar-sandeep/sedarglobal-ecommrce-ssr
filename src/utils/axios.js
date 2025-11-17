import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Axios Error:', error);
    }
    
    // Create a more detailed error object
    const errorMessage = error.response?.data?.message || 
                        error.response?.statusText || 
                        error.message || 
                        'Network request failed';
    
    const errorDetails = {
      message: errorMessage,
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method
    };
    
    return Promise.reject(errorDetails);
  }
);

export default axiosInstance;
