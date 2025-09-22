import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Cambia al host real de tu backend
});

export default api;
