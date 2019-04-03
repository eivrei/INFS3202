import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import registerReducer from './registerReducer';
import alertReducer from './alertReducer';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  register: registerReducer,
  alert: alertReducer
});

export default (state, action) => {
  return rootReducer(state, action);
};
