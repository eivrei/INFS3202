export const alertActionTypes = {
  SUCCESS: 'ALERT_SUCCESS',
  WARNING: 'ALERT_WARNING',
  INFO: 'ALERT_INFO',
  ERROR: 'ALERT_ERROR',
  CLEAR: 'ALERT_CLEAR'
};

const success = (message: string) => {
  return { type: alertActionTypes.SUCCESS, message };
};

const warning = (message: string) => {
  return { type: alertActionTypes.WARNING, message };
};

const info = (message: string) => {
  return { type: alertActionTypes.INFO, message };
};

const error = (message: string) => {
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
