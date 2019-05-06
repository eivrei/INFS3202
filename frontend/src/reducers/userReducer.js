import { userActionTypes } from '../actions/userActions';

const initialState = {
  isFetching: false,
  firstName: '',
  lastName: '',
  email: '',
  id: '',
  emailIsValidated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.FETCH_POFILE_REQUEST:
      return { ...state, isFetching: true };
    case userActionTypes.FETCH_POFILE_SUCCESS:
      return { ...state, isFetching: false, ...action.user };
    case userActionTypes.FETCH_POFILE_FAILURE:
    default:
      return state;
  }
};
