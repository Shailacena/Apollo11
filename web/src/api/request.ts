import axios from 'axios';

export interface Response {
  code: number
  message: string
  data: any
}

export const request = axios.create({
  baseURL: 'http://localhost:5173/api/',
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar',
    'Content-Type': 'application/json'
  },
});