import axios from 'axios';
import Cookies from 'js-cookie';
import { history } from './history';
import { API_URL, BASE_HEADERS } from '../config';
import { userActions } from '../actions/userActions';

const authInstance = axios.create({
  baseURL: API_URL,
  headers: BASE_HEADERS
});

export const apiInstance = axios.create({
  baseURL: `${API_URL}/api/v1/`,
  headers: BASE_HEADERS
});

apiInstance.interceptors.request.use(config => {
  const token = Cookies.get('token');

  // eslint-disable-next-line
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

// Log out user if token is expired
apiInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      userActions.signout();
      history.push('/signIn');
    }
    return Promise.reject(error);
  }
);

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
  return authInstance.post('token/', body);
}

export function verifyToken(body) {
  return authInstance.post('token/verify/', body);
}
