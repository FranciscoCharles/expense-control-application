import axios from 'axios';
//import { getToken } from '../services/auth';

const API_URL = 'http://localhost:3000';
const Api = axios.create({
  baseURL: API_URL,
});

/*
api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/
export default Api;