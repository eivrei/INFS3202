import { alertActionTypes } from '../actions/alertActions';

const initialState = {
  open: false,
  type: 'info',
  message: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case alertActionTypes.SUCCESS:
      return {
        ...state,
        open: true,
        type: 'success',
        message: action.message
      };
    case alertActionTypes.WARNING:
      return {
        ...state,
        open: true,
        type: 'warning',
        message: action.message
      };
    case alertActionTypes.INFO:
      return {
        ...state,
        open: true,
        type: 'info',
        message: action.message
      };
    case alertActionTypes.ERROR:
      return {
        ...state,
        open: true,
        type: 'error',
        message: action.message
      };
    case alertActionTypes.CLEAR:
      return { ...state, open: false };
    default:
      return state;
  }
};
