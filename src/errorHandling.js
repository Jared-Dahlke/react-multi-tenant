
import store from './redux/store/index'
import {SET_AUTH_TOKEN} from './redux/action-types/auth'

export default function handleError(responseCode) {
  switch (responseCode) {
  case 401:
    localStorage.removeItem('token')
    store.dispatch(SET_AUTH_TOKEN, null)
    break

  default:
    break
  }
}
