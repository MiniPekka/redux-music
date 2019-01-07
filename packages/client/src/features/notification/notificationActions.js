import shortid from 'shortid';
import * as types from './notificationActionTypes';

export function notificationSuccessFactory(message) {
  return {
    id: shortid.generate(),
    type: 'success',
    title: 'Success',
    message,
  };
}

export function notificationWarningFactory(message) {
  return {
    id: shortid.generate(),
    type: 'warning',
    message,
  };
}

export function notificationInfoFactory(message) {
  return {
    id: shortid.generate(),
    type: 'info',
    message,
  };
}

export function addNotification(notification) {
  return {
    type: types.NOTIFICATION_ADD,
    payload: {
      notification,
    },
  };
}

export function removeNotification(id) {
  return {
    type: types.NOTIFICATION_REMOVE,
    payload: {
      id,
    },
  };
}

export function createNotification(notification) {
  return (dispatch) => {
    dispatch(addNotification(notification));
    setTimeout(() => {
      dispatch(removeNotification(notification.id));
    }, 4000);
  };
}

export function notificationSuccess(message) {
  return (dispatch) => {
    const success = notificationSuccessFactory(message);
    dispatch(createNotification(success));
  };
}

export function notificationWarning(message) {
  return (dispatch) => {
    const warning = notificationWarningFactory(message);
    dispatch(createNotification(warning));
  };
}

export function defaultWarning() {
  return (dispatch) => {
    dispatch(notificationWarning('Something went wrong...'));
  };
}

export function authRequired() {
  return (dispatch) => {
    dispatch(notificationWarning('Please authenticate with soundcloud'));
  };
}

export function notificationInfo(message) {
  return (dispatch) => {
    const info = notificationInfoFactory(message);
    dispatch(createNotification(info));
  };
}
