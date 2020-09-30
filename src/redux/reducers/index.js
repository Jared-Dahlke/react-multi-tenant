
import {combineReducers} from 'redux'
import {roles, rolesHasErrored, rolesIsLoading, rolesPermissionsIsLoading, rolesPermissions, rolesPermissionsHasErrored} from './roles'
import {authToken, isLoggedIn, showAlert, user, userProfileIsLoading, successPasswordChanged} from './auth'
import {users, usersHasErrored, userDeleted, userDeletedError, userAdded, usersIsLoading, editUserUserAccountsLoading} from './users'
import {accounts, currentAccountId, isSwitchingAccounts, treeAccounts, editAccountAccountUsersLoading} from './accounts'
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
  userProfileIsLoading,
  successPasswordChanged,
  treeAccounts,
  editUserUserAccountsLoading,
  editAccountAccountUsersLoading
})