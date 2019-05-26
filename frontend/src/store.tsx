import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as immutable from 'redux-immutable-state-invariant';
import { logger } from 'redux-logger';
import rootReducer from './reducers/rootReducer';

const middleware =
  process.env.NODE_ENV !== 'production' ? [immutable.default(), thunk, logger] : [thunk];

const initialState = {};

export default () => createStore(rootReducer, initialState, applyMiddleware(...middleware));
