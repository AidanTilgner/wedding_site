import axios from "axios";

export const guestsAPI = axios.create({
  baseURL: import.meta.env.GUESTS_API_URL,
  headers: {
    "x-service": import.meta.env.GUESTS_SERVICE_NAME,
    "x-api-key": import.meta.env.GUESTS_API_KEY,
  },
});
