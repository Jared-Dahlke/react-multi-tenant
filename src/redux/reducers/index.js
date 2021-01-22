import { combineReducers } from 'redux'
import { rolesPermissionsIsLoading, rolesPermissions } from './roles'
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
	accountSaving
} from './accounts'
import {
	brandProfiles,
	brandProfilesIsLoading,
	hasBrandProfiles,
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
	rolesPermissionsIsLoading,
	isLoggedIn,
	loggingIn,
	alert,
	users,
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
	brandProfilesIsLoading,
	brandProfileUnderEdit,
	brandProfileLoading,
	hasBrandProfiles,
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
