
import {setAuthToken} from './redux/actions/auth'

export default function handleError(dispatch, responseCode) {
  switch (responseCode) {
  case 500:
    localStorage.removeItem('token')
    dispatch(setAuthToken(null))
    alert('Internal server error')
    break

  default:
    break
  }
}
