import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import registerReducer from './registerReducer';
import alertReducer from './alertReducer';
import userReducer from './userReducer';
import eventReducer from './eventReducer';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  register: registerReducer,
  alert: alertReducer,
  user: userReducer,
  events: eventReducer
});

export default (state, action) => {
  return rootReducer(state, action);
};
