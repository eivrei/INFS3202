import { userActionTypes } from '../actions/userActions';

const initialState = {
  isRegistering: false,
  isRegistered: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_UP_REQUEST:
      return { ...state, isRegistering: true };
    case userActionTypes.SIGN_UP_SUCCESS:
      return { ...state, isRegistering: false, isRegistered: true };
    case userActionTypes.SIGN_UP_FAILURE:
      return { ...state, isRegistering: false };
    default:
      return state;
  }
};
