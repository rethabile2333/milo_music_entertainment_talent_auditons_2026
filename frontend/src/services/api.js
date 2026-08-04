import axios from "axios";

const api = axios.create({
  baseURL: "milo-music-entertainment-talent-aud-alpha.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
