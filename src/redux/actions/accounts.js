import {
	SET_ACCOUNTS,
	SET_CURRENT_ACCOUNT_ID,
	SET_CURRENT_ACCOUNT,
	EDIT_ACCOUNT_ACCOUNT_USERS_LOADING,
	ACCOUNTS_SET_ACCOUNT_USERS,
	SET_ACCOUNT_TYPES,
	ACCOUNTS_UPDATE_ACCOUNT,
	SET_IS_SWITCHING_ACCOUNTS,
	SET_ACCOUNT_CREATED,
	SET_ACCOUNT_SAVED,
	SET_ACCOUNT_SAVING
} from '../action-types/accounts'
import axios from '../../axiosConfig'
import config from '../../config.js'
import {
	accountTypesObjValidation,
	usersWithRolesObjValidation
} from '../../schemas'
import { userProfileFetchData } from '../actions/auth'
import {
	usersFetchData,
	setUsers,
	usersIsLoading,
	editUserUserAccountsLoading
} from '../actions/users'
import {
	rolesFetchData,
	setRoles,
	rolesPermissionsFetchData,
	setRolesPermissions,
	rolesPermissionsIsLoading
} from '../actions/roles'
import {
	setBrandProfiles,
	fetchBrandProfiles,
	fetchBrandProfilesQueue,
	brandProfilesIsLoading
} from '../actions/brandProfiles'
import { fetchCategories } from '../actions/discover/channels.js'
import { findAccountNodeByAccountId } from '../../utils'

const apiBase = config.apiGateway.URL

export function setAccounts(accounts) {
	return {
		type: SET_ACCOUNTS,
		accounts
	}
}

export function setAccountTypes(accountTypes) {
	return {
		type: SET_ACCOUNT_TYPES,
		accountTypes
	}
}

export function accountsUpdateAccount(account) {
	return {
		type: ACCOUNTS_UPDATE_ACCOUNT,
		account
	}
}

export function setCurrentAccountId(accountId) {
	return {
		type: SET_CURRENT_ACCOUNT_ID,
		accountId
	}
}

export function setCurrentAccount(accountId) {
	return {
		type: SET_CURRENT_ACCOUNT,
		accountId
	}
}

export function setAccountSaved(accountSaved) {
	return {
		type: SET_ACCOUNT_SAVED,
		accountSaved
	}
}

export function setAccountSaving(accountSaving) {
	return {
		type: SET_ACCOUNT_SAVING,
		accountSaving
	}
}

export function isSwitchingAccounts(bool) {
	return {
		type: SET_IS_SWITCHING_ACCOUNTS,
		isSwitchingAccounts: bool
	}
}

export function accountCreated(bool) {
	return {
		type: SET_ACCOUNT_CREATED,
		accountCreated: bool
	}
}

export function updateAccount(account) {
	let accountId = account.accountId
	let url = apiBase + `/account/${accountId}`
	return async (dispatch) => {
		dispatch(setAccountSaving(true))
		dispatch(accountsUpdateAccount(account))
		try {
			const result = await axios.patch(url, account)
			if (result.status === 200) {
				dispatch(setAccountSaving(false))
				dispatch(setAccountSaved(true))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export const deleteAccount = (accountId) => {
	let url = apiBase + `/account/${accountId}`
	return (dispatch) => {
		dispatch(isSwitchingAccounts(true))
		dispatch(clearSiteData())
		axios
			.delete(url)
			.then((response) => {
				dispatch(fetchSiteData())
			})
			.catch((error) => {
				console.error('delete account error', error)
			})
	}
}

export const createAccount = (account) => {
	let url = apiBase + `/account`
	return (dispatch) => {
		dispatch(isSwitchingAccounts(true))
		axios
			.post(url, account)
			.then((response) => {
				dispatch(accountCreated(true))
				dispatch(fetchSiteData(response.data.accountId))
			})
			.catch((error) => {
				console.error('create account error', error)
			})
	}
}

export function clearSiteData() {
	return (dispatch) => {
		dispatch(rolesPermissionsIsLoading(true))
		dispatch(usersIsLoading(true))
		dispatch(brandProfilesIsLoading(true))
		dispatch(editUserUserAccountsLoading(true))
		dispatch(setAccounts([]))
		dispatch(setCurrentAccountId(null))
		dispatch(setUsers([]))
		dispatch(setRoles([]))
		dispatch(setRolesPermissions([]))
		dispatch(setBrandProfiles([]))
		dispatch(setAccountTypes([]))
	}
}

export function fetchSiteData(accountId) {
	return async (dispatch) => {
		try {
			let userId = localStorage.getItem('userId')
			let accountsUrl = apiBase + `/user/${userId}/accounts`
			let result = await axios.get(accountsUrl)
			//TODO: run this result against account schema
			let accounts = { data: result.data }
			if (!result.data[0]) {
				alert(
					'You have no accounts assigned to you. Please contact your inviter'
				)
				window.location.href = '/login'
				localStorage.removeItem('token')
				return
			}

			dispatch(setAccounts(accounts))

			if (!accountId) {
				let accountIdFromLocalStorage = localStorage.getItem('currentAccountId')
				if (accountIdFromLocalStorage) {
					let userStillHasAccessToThisAccount = false

					let node = findAccountNodeByAccountId(
						accountIdFromLocalStorage,
						result.data
					)
					if (node) {
						userStillHasAccessToThisAccount = true
					}

					if (!userStillHasAccessToThisAccount) {
						accountId = result.data[0].accountId
					} else {
						accountId = accountIdFromLocalStorage
					}
				} else {
					accountId = result.data[0].accountId
				}
			}

			localStorage.setItem('currentAccountId', accountId)
			dispatch(fetchAccountTypes())
			dispatch(setCurrentAccount(accountId))
			dispatch(setCurrentAccountId(accountId))
			dispatch(userProfileFetchData())
			dispatch(usersFetchData(accountId))
			dispatch(rolesPermissionsFetchData(accountId))
			dispatch(rolesFetchData(accountId))
			await dispatch(fetchBrandProfiles(accountId))
			dispatch(fetchBrandProfilesQueue())
			dispatch(isSwitchingAccounts(false))

			dispatch(fetchCategories())
		} catch (error) {
			console.log('caught in account action')
			console.log(error)
		}
	}
}

export function editAccountAccountUsersLoading(bool) {
	return {
		type: EDIT_ACCOUNT_ACCOUNT_USERS_LOADING,
		editAccountAccountUsersLoading: bool
	}
}

export function accountsSetAccountUsers(accountId, users) {
	let payload = { accountId, users }
	return {
		type: ACCOUNTS_SET_ACCOUNT_USERS,
		payload
	}
}

export function fetchAccountUsers(accountId) {
	let url = apiBase + `/account/${accountId}/users`
	return async (dispatch) => {
		dispatch(editAccountAccountUsersLoading(true))
		try {
			let result = []

			try {
				result = await axios.get(url)
			} catch (error) {
				console.log(error)
			}

			if (result.status === 200) {
				usersWithRolesObjValidation.validate(result.data).catch(function(err) {
					console.log(err.name, err.errors)
					alert('Could not validate account users data')
				})
				dispatch(accountsSetAccountUsers(accountId, result.data))
				dispatch(editAccountAccountUsersLoading(false))
			}
		} catch (error) {
			alert('Error on fetch account users: ' + JSON.stringify(error, null, 2))
		}
	}
}

export function fetchAccountTypes() {
	let url = apiBase + `/account/types`
	return async (dispatch) => {
		try {
			let result = []
			try {
				result = await axios.get(url)
			} catch (error) {
				console.log(error)
			}

			if (result.status === 200) {
				accountTypesObjValidation.validate(result.data).catch(function(err) {
					console.log(err.name, err.errors)
					alert('Could not validate account types data')
				})
				dispatch(setAccountTypes(result.data))
			}
		} catch (error) {
			alert('Error on fetch account types: ' + JSON.stringify(error, null, 2))
		}
	}
}
