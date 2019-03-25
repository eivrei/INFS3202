import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer
});

export default (state, action) => {
  return rootReducer(state, action);
};
