import { combineReducers } from 'redux'
import {
	roles,
	rolesHasErrored,
	rolesIsLoading,
	rolesPermissionsIsLoading,
	rolesPermissions,
	rolesPermissionsHasErrored
} from './roles'
import {
	authToken,
	isLoggedIn,
	alert,
	user,
	userProfileIsLoading
} from './auth'
import {
	users,
	usersHasErrored,
	userDeleted,
	userDeletedError,
	userAdded,
	userAdding,
	usersIsLoading,
	editUserUserAccountsLoading,
	userProfileSaving,
	userProfileSaved,
	userEditSaving,
	userEditSaved
} from './users'
import {
	accounts,
	currentAccountId,
	isSwitchingAccounts,
	treeAccounts,
	editAccountAccountUsersLoading,
	accountTypes,
	accountCreated,
	accountSaving,
	accountSaved
} from './accounts'
import {
	brandProfiles,
	brandProfilesIsLoading,
	hasBrandProfiles,
	scenarioProperties,
	industryVerticals,
	topics,
	brandProfileSaved,
	brandProfileSaving,
	brandProfileDeleted,
	brandProfileDeleting
} from './brandProfiles'
import { categories, channels, videos } from './discover/channels'

export default combineReducers({
	authToken,
	roles,
	rolesPermissions,
	rolesHasErrored,
	rolesPermissionsHasErrored,
	rolesIsLoading,
	rolesPermissionsIsLoading,
	isLoggedIn,
	alert,
	users,
	usersHasErrored,
	user,
	userDeleted,
	userDeletedError,
	usersIsLoading,
	brandProfiles,
	brandProfileSaved,
	brandProfileSaving,
	brandProfileDeleted,
	brandProfileDeleting,
	userAdded,
	userAdding,
	userEditSaving,
	userEditSaved,
	accounts,
	currentAccountId,
	isSwitchingAccounts,
	userProfileIsLoading,
	userProfileSaving,
	userProfileSaved,
	treeAccounts,
	editUserUserAccountsLoading,
	editAccountAccountUsersLoading,
	accountTypes,
	brandProfilesIsLoading,
	accountCreated,
	hasBrandProfiles,
	scenarioProperties,
	industryVerticals,
	topics,
	categories,
	channels,
	videos,
	accountSaving,
	accountSaved
})
