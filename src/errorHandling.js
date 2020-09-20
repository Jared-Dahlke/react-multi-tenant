
import {setAuthToken} from './redux/actions/auth'

export default function handleError(dispatch, responseCode) {
  switch (responseCode) {
  case 401:
    alert('Error: you are not authorized!')
    localStorage.removeItem('token')
    dispatch(setAuthToken(null))
    break
  case 500:
    localStorage.removeItem('token')
    dispatch(setAuthToken(null))
    alert('Internal server error')
    break

  default:
    break
  }
}
