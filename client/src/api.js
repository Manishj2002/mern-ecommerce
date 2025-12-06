import axios from "axios";

const API = axios.create({
  baseURL: 'https://mern-ecommerce-2l62.onrender.com', // your live backend URL
  withCredentials: true, // only if backend uses cookies
});

export default API;
