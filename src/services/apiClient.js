import axios from "axios";
import { API_BASE_URL } from "../constants";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // We will get the token from a utility or state if needed, 
    // but for now, we'll pass it in headers where required or handle it here if we store it globally.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
