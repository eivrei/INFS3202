export const alertActionTypes = {
  SUCCESS: 'ALERT_SUCCESS',
  WARNING: 'ALERT_WARNING',
  INFO: 'ALERT_INFO',
  ERROR: 'ALERT_ERROR',
  CLEAR: 'ALERT_CLEAR'
};

const success = message => {
  return { type: alertActionTypes.SUCCESS, message };
};

const warning = message => {
  return { type: alertActionTypes.WARNING, message };
};

const info = message => {
  return { type: alertActionTypes.INFO, message };
};

const error = message => {
  return { type: alertActionTypes.ERROR, message };
};

const clear = () => {
  return { type: alertActionTypes.CLEAR };
};

// All possible alert actions
export const alertActions = {
  success,
  warning,
  info,
  error,
  clear
};
