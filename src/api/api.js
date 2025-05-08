// File: src/api/api.js
import axios from "axios";

// Your production & local fallback URLs
const PROD_URL = "https://campmeeting-prod-f2b77d417fab.herokuapp.com/api/api/";
const LOCAL_URL = "http://localhost:8000/api/";

// Choose baseURL in this order:
// 1. VITE_API_URL from .env
// 2. PROD_URL if running in Vite's production mode
// 3. LOCAL_URL otherwise
const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production" ? PROD_URL : LOCAL_URL);

const API = axios.create({ baseURL });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
