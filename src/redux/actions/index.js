
import {ADD_ARTICLE, SET_AUTH_TOKEN} from '../constants/action-types'

export function addArticle (payload) {
  return {type: ADD_ARTICLE, payload}
}

export function setAuthToken (payload) {
  return {type: SET_AUTH_TOKEN, payload}
}
