import { userActionTypes } from '../actions/userActions';

const initialState = {
  isLoggedIn: false,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN:
      return { ...state, isLoggedIn: true };
    case userActionTypes.SIGN_OUT:
      return { ...state, isLoggedIn: false };
    case userActionTypes.SIGN_UP_ERROR:
    case userActionTypes.SIGN_IN_ERROR:
      return { ...state, error: action.errorMessage };
    default:
      return state;
  }
};
