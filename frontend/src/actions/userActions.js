import axios from 'axios';
import Cookies from 'js-cookie';
import { login, post } from '../utils/api';

export const userActionTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  SIGN_OUT: 'SIGN_OUT',
  SIGN_IN_ERROR: 'SIGN_IN_ERROR',
  SIGN_UP_ERROR: 'SIGN_UP_ERROR'
};

export const signIn = (username, password) => async dispatch => {
  await login({
    username,
    password
  })
    .then(res => {
      if (res.status === 200) {
        Cookies.set('token', res.data.token, { expires: 7 });
        axios.defaults.headers.common.Authorization = `JWT ${res.data.token}`;
        dispatch({
          type: userActionTypes.SIGN_IN
        });
      }
    })
    .catch(({ response }) => {
      dispatch({
        type: userActionTypes.SIGN_IN_ERROR,
        errorMessage: response.data
      });
    });
};

export const signUp = (email, password, firstName, lastName) => async dispatch => {
  await post('/users', {
    email,
    password,
    firstName,
    lastName
  })
    .then(res => {
      if (res.status === 201) {
        Cookies.set('token', res.data.token, { expires: 7 });
        axios.defaults.headers.common.Authorization = `JWT ${res.data.token}`;
        dispatch({
          type: userActionTypes.SIGN_UP
        });
      }
    })
    .catch(({ response }) => {
      dispatch({
        type: userActionTypes.SIGN_UP_ERROR,
        errorMessage: response.data
      });
    });
};

export const signOut = () => dispatch => {
  dispatch({
    type: userActionTypes.SIGN_OUT
  });
};
