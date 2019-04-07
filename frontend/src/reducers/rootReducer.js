import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import registerReducer from './registerReducer';
import alertReducer from './alertReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  register: registerReducer,
  alert: alertReducer,
  user: userReducer
});

export default (state, action) => {
  return rootReducer(state, action);
};
