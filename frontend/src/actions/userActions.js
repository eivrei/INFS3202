import Cookies from 'js-cookie';
import { apiInstance, login, get, post } from '../utils/api';
import { history } from '../utils/history';
import { alertActions } from './alertActions';

export const userActionTypes = {
  SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',

  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',

  SIGN_OUT: 'SIGN_OUT',

  FETCH_POFILE_REQUEST: 'FETCH_PROFILE_REQUEST',
  FETCH_POFILE_SUCCESS: 'FETCH_PROFILE_SUCCESS',
  FETCH_POFILE_FAILURE: 'FETCH_PROFILE_FAILURE'
};

const signIn = (username, password, remember) => {
  function request(user) {
    return { type: userActionTypes.SIGN_IN_REQUEST, user };
  }
  function success(token, rememberUser) {
    return { type: userActionTypes.SIGN_IN_SUCCESS, token, rememberUser };
  }
  function failure(error) {
    return { type: userActionTypes.SIGN_IN_FAILURE, error };
  }

  return async dispatch => {
    dispatch(request(username));

    await login({
      username,
      password
    })
      .then(res => {
        if (res.status === 200) {
          Cookies.set('token', res.data.access, remember ? { expires: 7 } : {});
          apiInstance.defaults.headers.common.Authorization = `Bearer ${res.data.access}`;
          dispatch(success(res.data.access, remember));
          dispatch(alertActions.success('Successfully signed in'));
          history.push('/my-profile');
        }
      })
      .catch(({ response }) => {
        dispatch(failure(response.data));
        dispatch(alertActions.error(response.data));
      });
  };
};

const signUp = (email, password, firstName, lastName) => {
  function request(user) {
    return { type: userActionTypes.SIGN_UP_REQUEST, user };
  }
  function success(user) {
    return { type: userActionTypes.SIGN_UP_SUCCESS, user };
  }
  function failure(error) {
    return { type: userActionTypes.SIGN_UP_FAILURE, error };
  }

  return async dispatch => {
    const userObject = { email, password, firstName, lastName };
    dispatch(request(userObject));
    await post('/users', userObject)
      .then(res => {
        if (res.status === 201) {
          dispatch(success(res.data));
          dispatch(alertActions.success('Successfully signed up. You are now able to sign in'));
          history.push('/sign-in');
        }
      })
      .catch(({ response }) => {
        dispatch(failure(response.data));
        dispatch(alertActions.error(response.data));
      });
  };
};

const deleteAllUserInfo = dispatch => {
  Cookies.remove('token');
  apiInstance.defaults.headers.common.Authorization = null;
  dispatch({
    type: userActionTypes.SIGN_OUT
  });
};

const signOut = () => dispatch => {
  deleteAllUserInfo(dispatch);
  dispatch(alertActions.success('Successfully signed out'));
};

const signOutWithoutAlert = () => dispatch => {
  deleteAllUserInfo(dispatch);
};

const fetchProfile = () => {
  function request() {
    return { type: userActionTypes.FETCH_POFILE_REQUEST };
  }
  function success(user) {
    return { type: userActionTypes.FETCH_POFILE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userActionTypes.FETCH_POFILE_FAILURE, error };
  }

  return async dispatch => {
    dispatch(request());

    await get('/users/current')
      .then(res => {
        if (res.status === 200) {
          dispatch(success(res.data));
        }
      })
      .catch(({ response }) => {
        dispatch(failure(response.data));
        dispatch(alertActions.error(response.data));
      });
  };
};

// All possible user actions
export const userActions = {
  signIn,
  signUp,
  signOut,
  signOutWithoutAlert,
  fetchProfile
};
