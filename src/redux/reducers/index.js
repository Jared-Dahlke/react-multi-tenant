
import {combineReducers} from 'redux'
import {roles, rolesHasErrored, rolesIsLoading, rolesPermissions, rolesPermissionsHasErrored} from './roles'
import {authToken, isLoggedIn, showAlert, user} from './auth'
import {users, usersHasErrored} from './users'


export default combineReducers({
  authToken,
  roles,
  rolesPermissions,
  rolesHasErrored,
  rolesPermissionsHasErrored,
  rolesIsLoading,
  isLoggedIn,
  showAlert,
  users,
  usersHasErrored,
  user
})