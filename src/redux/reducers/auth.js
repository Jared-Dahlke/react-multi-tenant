import {SET_AUTH_TOKEN, SET_LOGGED_IN, SET_SHOW_ALERT} from '../action-types/auth'

export function authToken(state = null, action) {
  switch (action.type) {
  case SET_AUTH_TOKEN:
    return action.payload;
  default:
    return state;
  }
}

export function isLoggedIn(state = false, action) {
  switch (action.type) {
  case SET_LOGGED_IN:
    return action.payload;
  default:
    return state;
  }
}

export function showAlert(state = false, action) {
  switch (action.type) {
  case SET_SHOW_ALERT:
    return action.payload;
  default:
    return state;
  }
}
