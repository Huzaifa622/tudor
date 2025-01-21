import axios from "axios"
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers:{
        "Content-Type":"applictaion/json"
    }
  });


  api.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration and redirection
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("Token expired or unauthorized access. Redirecting to login...");
      
      // Clear the token from localStorage
      window.localStorage.removeItem("token");

      // Redirect the user to the login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;