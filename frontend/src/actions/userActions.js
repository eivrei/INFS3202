import Cookies from 'js-cookie';
import { apiInstance, login, get, post, verifyToken } from '../utils/api';
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

  VERIFY_USER_REQUEST: 'VERIFY_USER_REQUEST',
  VERIFY_USER_SUCCESS: 'VERIFY_USER_SUCCESS',
  VERIFY_USER_FAILURE: 'VERIFY_USER_FAILURE',

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
          Cookies.set('token', res.data.token, remember ? { expires: 7 } : {});
          apiInstance.defaults.headers.common.Authorization = `JWT ${res.data.token}`;
          console.log(apiInstance.defaults.headers.common.Authorization);
          dispatch(success(res.data.token, remember));
          dispatch(alertActions.success('Successfully signed in'));
          history.push('/my-profile');
        }
      })
      .catch(({ response }) => {
        dispatch(failure(response.data));
        Object.values(response.data).map(errors =>
          errors.map(e => dispatch(alertActions.error(e)))
        );
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
        Object.values(response.data).map(errors =>
          errors.map(e => dispatch(alertActions.error(e)))
        );
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

const verifyUser = () => {
  function request(token) {
    return { type: userActionTypes.VERIFY_USER_REQUEST, token };
  }
  function success(token) {
    return { type: userActionTypes.VERIFY_USER_SUCCESS, token };
  }
  function failure(error) {
    return { type: userActionTypes.VERIFY_USER_FAILURE, error };
  }

  return async dispatch => {
    try {
      const token = await Cookies.get('token');
      dispatch(request(token));
      const res = await verifyToken({ token });
      if (res.status === 200) {
        apiInstance.defaults.headers.common.Authorization = `JWT ${res.data.token}`;
        dispatch(success(res.data.token));
      } else {
        signOutWithoutAlert();
        dispatch(failure('Something unexpected happened. Try again later'));
        dispatch(
          alertActions.error('Something unexpected happened while verifying user. Try again later')
        );
      }
    } catch (err) {
      console.error(`Error: ${err}`);
      signOutWithoutAlert();
      dispatch(failure(err));
      dispatch(alertActions.error(err));
    }
  };
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
        Object.values(response.data).map(errors =>
          errors.map(e => dispatch(alertActions.error(e)))
        );
      });
  };
};

// All possible user actions
export const userActions = {
  signIn,
  signUp,
  signOut,
  signOutWithoutAlert,
  verifyUser,
  fetchProfile
};
