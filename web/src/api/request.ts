import axios from 'axios';

export const request = axios.create({
  baseURL: `${window.location.origin}/api/`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  },
});