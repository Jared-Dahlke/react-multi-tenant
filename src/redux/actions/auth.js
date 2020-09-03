
import {SET_AUTH_TOKEN} from '../action-types/auth'

export function setAuthToken (payload) {
  return {type: SET_AUTH_TOKEN, payload}
}