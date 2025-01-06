import axios from 'axios';

export interface Response {
  code: number
  message: string
  data: any
}

export const request = axios.create({
  baseURL: `${window.location.origin}/api/`,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  },
});