
import {combineReducers} from 'redux'
import {roles, rolesHasErrored, rolesIsLoading, rolesPermissions, rolesPermissionsHasErrored} from './roles'
import {authToken, isLoggedIn, showAlert, user} from './auth'
import {users, usersHasErrored, userDeleted, userDeletedError, userAdded} from './users'
import {accounts, currentAccountId} from './accounts'
import {brandProfiles} from './brandProfiles'


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
  user,
  userDeleted,
  userDeletedError,
  brandProfiles,
  userAdded,
  accounts,
  currentAccountId
})