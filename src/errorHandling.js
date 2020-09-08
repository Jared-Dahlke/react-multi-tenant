import {setAuthToken} from './redux/actions/auth'
import store from './redux/store/index'




export default function handleError(responseCode) {
  console.log('handle error')
  console.log(responseCode)
  switch (responseCode) {
    case 401:
      console.log('inside 401 switch')
      localStorage.removeItem('token')
      store.dispatch('SET_AUTH_TOKEN', null)
      break;
  
    default:
      break;
  }
}
