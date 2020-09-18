import {SET_AUTH_TOKEN, SET_LOGGED_IN, SET_USER, SET_USER_ID} from '../action-types/auth'
import {User} from '../../models/user'

const initialState = {
  token: null,
  isAuthenticated: null,
  loading: true,
  user: null,
}

export function authToken(state = null, action) {
  switch (action.type) {
  case SET_AUTH_TOKEN:
    return action.payload;
  default:
    return state;
  }
}

let newUser = new User(' ', ' ', ' ', ' ', ' ', ' ', ' ')

export function user(state = newUser, action) {
  switch (action.type) {
  case SET_USER:
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

export function userId(state = null, action){
  switch (action.type) {
  case SET_USER_ID:
    return action.payload;
  default:
    return state;
  }
}
