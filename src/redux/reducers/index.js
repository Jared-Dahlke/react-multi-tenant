
import {combineReducers} from 'redux'
import {roles, rolesHasErrored, rolesIsLoading, rolesPermissions, rolesPermissionsHasErrored} from './roles'
import { isLoggedIn, authReducer, authToken, userId} from './auth'
import {authToken, isLoggedIn, user} from './auth'
import {users, usersHasErrored} from './users'


export default combineReducers({
  authToken,
  userId,
  roles,
  rolesPermissions,
  rolesHasErrored,
  rolesPermissionsHasErrored,
  rolesIsLoading,
  isLoggedIn,
  users,
  usersHasErrored,
  authReducer,
  user
})