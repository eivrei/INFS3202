import Cookies from 'js-cookie';
import { userActionTypes } from '../actions/userActions';

const token = Cookies.get('token');

const initialState = token
  ? {
      isLoggedIn: true,
      isLoggingIn: false,
      remember: false,
      token
    }
  : { isLoggedIn: false, isLoggingIn: false, remember: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN_REQUEST:
      return { ...state, isLoggingIn: true, user: action.user };
    case userActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        token: action.token,
        remember: action.rememberUser
      };
    case userActionTypes.SIGN_IN_FAILURE:
      return { ...state, isLoggingIn: false };
    case userActionTypes.SIGN_OUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};
