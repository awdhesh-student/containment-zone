// Import the Axios library
import axios from 'axios';

// Create an Axios instance with the base URL for your backend server
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Set your backend server's URL here
});

// Export the Axios instance for use in other parts of your application
export default axiosInstance;