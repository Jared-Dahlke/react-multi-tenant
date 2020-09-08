
import {combineReducers} from 'redux'
import {roles, rolesHasErrored, rolesIsLoading} from './roles'
import {authToken, isLoggedIn} from './auth'


export default combineReducers({
  authToken,
  roles,
  rolesHasErrored,
  rolesIsLoading,
  isLoggedIn
})