import {SET_AUTH_TOKEN, SET_LOGGED_IN, SET_SHOW_ALERT, SET_USER, SET_USER_ID} from '../action-types/auth'
import {User} from '../../models/user'

let newUser = new User(' ', ' ', ' ', ' ', ' ', ' ', [], [])

const initialState = {
  token: null,
  isAuthenticated: null,
  loading: true,
  userProfile: newUser,
}

export function authToken(state = null, action) {
  switch (action.type) {
  case SET_AUTH_TOKEN:
    return action.payload;
  default:
    return state;
  }
}


export function user(state = initialState, action) {
  switch (action.type) {
  case SET_USER:
    return {
      ...state,
      loading: false,
      userProfile: action.payload
    }
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

export function showAlert(state = false, action) {
  switch (action.type) {
  case SET_SHOW_ALERT:
    return action.payload;
  default:
    return state;
  }
}
