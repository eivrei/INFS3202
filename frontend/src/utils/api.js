import axios from 'axios';
import { API_URL, BASE_HEADERS } from '../config';

const authInstance = axios.create({
  baseURL: API_URL,
  headers: BASE_HEADERS
});

const apiInstance = axios.create({
  baseURL: `${API_URL}/api/v1/`,
  headers: BASE_HEADERS
});

export function get(url) {
  return apiInstance.get(`${url}/`);
}

export function put(url, body) {
  return apiInstance.put(`${url}/`, body);
}

export function post(url, body) {
  return apiInstance.post(`${url}/`, body);
}

export function login(body) {
  return authInstance.post('authorization/token-auth/', body);
}

export function verifyToken(body) {
  return authInstance.post('authorization/token-auth/verify/', body);
}
