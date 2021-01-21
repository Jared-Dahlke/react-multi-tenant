import { combineReducers } from 'redux'
import {
	rolesPermissionsIsLoading,
	rolesPermissions,
	rolesPermissionsHasErrored
} from './roles'
import {
	authToken,
	isLoggedIn,
	alert,
	user,
	userProfileIsLoading,
	loggingIn,
	updatingPassword,
	loggedInUserPermissions,
	resettingPassword
} from './auth'
import {
	users,
	usersHasErrored,
	userAdding,
	usersIsLoading,
	editUserUserAccountsLoading,
	userProfileSaving,
	userEditSaving
} from './users'
import {
	accounts,
	currentAccountId,
	isSwitchingAccounts,
	editAccountAccountUsersLoading,
	accountTypes,
	accountSaving
} from './accounts'
import {
	brandProfiles,
	brandProfilesIsLoading,
	hasBrandProfiles,
	industryVerticals,
	brandProfileCreated,
	brandProfileCreating,
	brandProfileDeleting,
	brandProfileLoading,
	brandProfileSaving,
	brandProfileSaved,
	scenariosIsLoading,
	brandProfileUnderEdit
} from './brandProfiles'

import admin from './admin/index'
import engage from './engage/index'
import thirdParty from './ThirdParty/index'

export default combineReducers({
	authToken,
	rolesPermissions,
	rolesPermissionsHasErrored,
	rolesPermissionsIsLoading,
	isLoggedIn,
	loggingIn,
	alert,
	users,
	usersHasErrored,
	user,
	usersIsLoading,
	brandProfiles,
	brandProfileCreated,
	brandProfileCreating,
	brandProfileDeleting,
	userAdding,
	userEditSaving,
	accounts,
	currentAccountId,
	isSwitchingAccounts,
	userProfileIsLoading,
	userProfileSaving,
	editUserUserAccountsLoading,
	editAccountAccountUsersLoading,
	accountTypes,
	brandProfilesIsLoading,
	brandProfileUnderEdit,
	brandProfileLoading,
	hasBrandProfiles,
	industryVerticals,
	accountSaving,
	brandProfileSaving,
	brandProfileSaved,
	updatingPassword,
	loggedInUserPermissions,
	resettingPassword,
	scenariosIsLoading,
	admin,
	engage,
	thirdParty
})
