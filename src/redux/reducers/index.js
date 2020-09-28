
import {combineReducers} from 'redux'
import {roles, rolesHasErrored, rolesIsLoading, rolesPermissionsIsLoading, rolesPermissions, rolesPermissionsHasErrored} from './roles'
import {authToken, isLoggedIn, showAlert, user, userProfileIsLoading} from './auth'
import {users, usersHasErrored, userDeleted, userDeletedError, userAdded, usersIsLoading} from './users'
import {accounts, currentAccountId, isSwitchingAccounts} from './accounts'
import {brandProfiles} from './brandProfiles'


export default combineReducers({
  authToken,
  roles,
  rolesPermissions,
  rolesHasErrored,
  rolesPermissionsHasErrored,
  rolesIsLoading,
  rolesPermissionsIsLoading,
  isLoggedIn,
  showAlert,
  users,
  usersHasErrored,
  user,
  userDeleted,
  userDeletedError,
  usersIsLoading,
  brandProfiles,
  userAdded,
  accounts,
  currentAccountId,
  isSwitchingAccounts,
  userProfileIsLoading
})