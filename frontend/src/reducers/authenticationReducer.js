import Cookies from 'js-cookie';
import { userActionTypes } from '../actions/userActions';

const token = Cookies.get('token');

const initialState = () => {
  const defaultStateVariables = {
    isLoggedIn: false,
    isLoggingIn: false,
    remember: false,
    isSendingPasswordResetRequest: false,
    isChangingPassword: false
  };
  if (token) {
    return { ...defaultStateVariables, isLoggedIn: true, token };
  }
  return defaultStateVariables;
};

export default (state = initialState(), action) => {
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

    case userActionTypes.NEW_PASSWORD_RESET_REQUEST:
      return { ...state, isSendingPasswordResetRequest: true };
    case userActionTypes.NEW_PASSWORD_RESET_SUCCESS:
    case userActionTypes.NEW_PASSWORD_RESET_FAILURE:
      return { ...state, isSendingPasswordResetRequest: false };

    case userActionTypes.PERFORM_PASSWORD_RESET_REQUEST:
      return { ...state, isChangingPassword: true };
    case userActionTypes.PERFORM_PASSWORD_RESET_SUCCESS:
    case userActionTypes.PERFORM_PASSWORD_RESET_FAILURE:
      return { ...state, isChangingPassword: false };
    default:
      return state;
  }
};
