import {SET_AUTH_TOKEN, SET_LOGGED_IN, SET_USER_ID, USER_LOADED} from '../action-types/auth'

const initialState = {
  token: null,
  isAuthenticated: null,
  loading: true,
  user: null,
}
import {SET_AUTH_TOKEN, SET_LOGGED_IN, SET_USER} from '../action-types/auth'
import {User} from '../../models/user'

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



export function authReducer (state = initialState, action){
  const {type,payload} = action 
  switch (type) {
    case USER_LOADED:
       return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    default:
      return state
  }
}
