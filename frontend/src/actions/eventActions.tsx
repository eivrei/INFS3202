import { history } from '../utils/history';
import { get, post } from '../utils/api';
import { alertActions } from './alertActions';

export const eventActionTypes = {
  FETCH_ALL_EVENTS_REQUEST: 'FETCH_ALL_EVENTS_REQUEST',
  FETCH_ALL_EVENTS_SUCCESS: 'FETCH_ALL_EVENTS_SUCCESS',
  FETCH_ALL_EVENTS_FAILURE: 'FETCH_ALL_EVENTS_FAILURE',

  FETCH_EVENT_REQUEST: 'FETCH_EVENT_REQUEST',
  FETCH_EVENT_SUCCESS: 'FETCH_EVENT_SUCCESS',
  FETCH_EVENT_FAILURE: 'FETCH_EVENT_FAILURE',

  SEARCH_EVENT: 'SEARCH_EVENT',

  CREATE_EVENT_REQUEST: 'CREATE_EVENT_REQUEST',
  CREATE_EVENT_SUCCESS: 'CREATE_EVENT_SUCCESS',
  CREATE_EVENT_FAILURE: 'CREATE_EVENT_FAILURE'
};

const loadAllEvents = (page: string) => {
  function request() {
    return { type: eventActionTypes.FETCH_ALL_EVENTS_REQUEST };
  }
  function success(data: any) {
    return {
      type: eventActionTypes.FETCH_ALL_EVENTS_SUCCESS,
      events: data.results,
      count: data.count,
      nextPage: data.next === null ? null : data.next.slice(-1),
      previousPage: data.previous === null ? null : data.previous.slice(-1)
    };
  }
  function failure(error: string) {
    return { type: eventActionTypes.FETCH_ALL_EVENTS_FAILURE, error };
  }

  return async dispatch => {
    dispatch(request());

    await get(`/events/?page=${page}`)
      .then(res => {
        dispatch(success(res.data));
      })
      .catch(({ response }) => {
        if (response === undefined) {
          dispatch(failure('No connection with server'));
          dispatch(alertActions.error('Connection error with server. Try again later.'));
        } else {
          dispatch(failure(response.data.detail));
          dispatch(alertActions.error('Something went wrong while fetching all events'));
        }
      });
  };
};

const loadEvent = id => {
  function request(requestId) {
    return { type: eventActionTypes.FETCH_EVENT_REQUEST, requestId };
  }
  function success(event) {
    return {
      type: eventActionTypes.FETCH_EVENT_SUCCESS,
      event
    };
  }
  function failure(error) {
    return { type: eventActionTypes.FETCH_EVENT_FAILURE, error };
  }

  return async dispatch => {
    dispatch(request(id));

    await get(`/events/${id}`)
      .then(res => {
        dispatch(success(res.data));
      })
      .catch(({ response }) => {
        if (response === undefined) {
          dispatch(failure('No connection with server'));
          dispatch(alertActions.error('Connection error with server. Try again later.'));
        } else {
          dispatch(failure(response.data.detail));
          dispatch(
            alertActions.error(`Something went wrong while fetching the event with id ${id}`)
          );
        }
      });
  };
};

const createNewEvent = data => {
  function request(formData) {
    return { type: eventActionTypes.CREATE_EVENT_REQUEST, formData };
  }
  function success(id) {
    return {
      type: eventActionTypes.CREATE_EVENT_SUCCESS,
      id
    };
  }
  function failure(error) {
    return { type: eventActionTypes.CREATE_EVENT_FAILURE, error };
  }

  return async dispatch => {
    dispatch(request(data));

    await post('/events', {
      ...data
    })
      .then(res => {
        dispatch(success(res.data.id));
        dispatch(alertActions.success(`Successfully created event with title ${data.title}`));
        history.push('/');
      })
      .catch(({ response }) => {
        if (response === undefined) {
          dispatch(failure('No connection with server'));
          dispatch(alertActions.error('Connection error with server. Try again later.'));
        } else {
          dispatch(failure(response.data.type));
          dispatch(alertActions.error('Something went wrong while creating new event'));
        }
      });
  };
};

const searchEvent = searchText => dispatch => {
  dispatch({ type: eventActionTypes.SEARCH_EVENT, searchText });
};

// All possible user actions
export const eventActions = {
  loadAllEvents,
  loadEvent,
  createNewEvent,
  searchEvent
};
