import { eventActionTypes } from '../actions/eventActions';

const initialState = {
  isFetching: false,
  isSubmitting: false,
  count: 0,
  previousPage: null,
  nextPage: null,
  events: [],
  currentEvent: null,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case eventActionTypes.FETCH_ALL_EVENTS_REQUEST:
    case eventActionTypes.FETCH_EVENT_REQUEST:
      return { ...state, isFetching: true, error: false };

    case eventActionTypes.FETCH_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        count: action.count,
        previousPage: action.previousPage,
        nextPage: action.nextPage,
        events: action.events
      };
    case eventActionTypes.FETCH_EVENT_SUCCESS:
      return { ...state, isFetching: false, currentEvent: action.event };

    case eventActionTypes.FETCH_ALL_EVENTS_FAILURE:
    case eventActionTypes.FETCH_EVENT_FAILURE:
      return { ...state, isFetching: false, error: action.error };

    case eventActionTypes.CREATE_EVENT_REQUEST:
      return { ...state, isSubmitting: true };
    case eventActionTypes.CREATE_EVENT_SUCCESS:
      return { ...state, isSubmitting: false };
    case eventActionTypes.CREATE_EVENT_FAILURE:
      return { ...state, isSubmitting: false, error: action.error };
    default:
      return state;
  }
};
