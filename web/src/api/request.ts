import axios from 'axios';

export const request = axios.create({
  baseURL: `${window.location.origin}/api/`,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  },
});