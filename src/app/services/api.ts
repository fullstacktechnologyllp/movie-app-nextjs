// services/api.ts
import axios, { AxiosError } from 'axios';


// const setAuthToken = () => {
//   if (typeof window !== 'undefined') {
//     const token = localStorage.getItem('token');
//     if (token) {
//       axios.defaults.headers.common[ 'Authorization' ] = `Bearer ${token}`;
//     } else {
//       delete axios.defaults.headers.common[ 'Authorization' ];
//     }
//   }
// };

// // Apply token to headers on initial load
// setAuthToken();

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => {
    Promise.reject(error)
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError | any) => {
    if (error.response) {
      if (error.response.data && error.response.data.message === 'UNAUTHORIZED') {
        localStorage.removeItem('token');
        return window.location.href = '/signin';
      } else if (error.response.data && error.response.data.message.message === 'AUTH_TOKEN_IS_REQUIRED') {
        return window.location.href = '/signin';
      } else if (error.response.data && error.response.data.message === 'AUTH_TOKEN_IS_EXPIRED') {
        localStorage.removeItem('token');
        return window.location.href = '/signin';
      }
      console.error('Response error:', error.response.data);
      // Handle the error here, e.g., trigger a toast message or other actions
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error.response.data);
  }
);

export default axios;
