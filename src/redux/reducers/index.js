import { ADD_ARTICLE, SET_AUTH_TOKEN, SET_ALL_ROLES } from "../constants/action-types";
import {combineReducers} from 'redux'
import {items, itemsHasErrored, itemsIsLoading} from './roles'
import {authToken} from './auth'

/* const initialState = {
  articles: []
}

function rootReducer(state = initialState, action) {
  if(action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    })
  }

  if(action.type === SET_AUTH_TOKEN) {
    return Object.assign({}, state, {
      authToken: action.payload
    })
  }

  if(action.type === SET_ALL_ROLES) {
    return Object.assign({}, state, {
      allRoles: action.payload
    })
  }

  return state
} */

export default combineReducers({
  authToken,
  items,
  itemsHasErrored,
  itemsIsLoading
})