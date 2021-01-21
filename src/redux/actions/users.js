import {
	USERS_HAS_ERRORED,
	SET_USERS,
	USER_DELETED,
	USER_DELETED_ERROR,
	USERS_REMOVE_USER,
	USERS_ADD_USER,
	USERS_IS_LOADING,
	USERS_SET_USER_ACCOUNTS,
	EDIT_USER_USER_ACCOUNTS_LOADING,
	USER_PROFILE_SAVED,
	USER_PROFILE_SAVING,
	USER_ADDING,
	USER_EDIT_SAVED,
	USER_EDIT_SAVING,
	SET_USER_ADD_ERROR
} from '../action-types/users'
import { SET_ALERT } from '../action-types/auth'
import axios from '../../axiosConfig'
import config from '../../config.js'
import { accountsObjValidation, userObjValidation } from '../../schemas/schemas'
import { setUser } from './auth'
import toast from 'react-hot-toast'

const apiBase = config.api.userAccountUrl

export function usersHasErrored(bool) {
	return {
		type: USERS_HAS_ERRORED,
		hasErrored: bool
	}
}

export function userDeleted(bool) {
	return {
		type: USER_DELETED,
		userDeleted: bool
	}
}

export function userDeletedError(bool) {
	return {
		type: USER_DELETED_ERROR,
		userDeleted: bool
	}
}

export function setUsers(users) {
	return {
		type: SET_USERS,
		users
	}
}

export function usersIsLoading(bool) {
	return {
		type: USERS_IS_LOADING,
		usersIsLoading: bool
	}
}

export function userProfileSaving(bool) {
	return {
		type: USER_PROFILE_SAVING,
		userProfileSaving: bool
	}
}

export function userProfileSaved(bool) {
	return {
		type: USER_PROFILE_SAVED,
		userProfileSaved: bool
	}
}

export function setUserAdding(bool) {
	return {
		type: USER_ADDING,
		userAdding: bool
	}
}

export function setUserEditSaving(bool) {
	return {
		type: USER_EDIT_SAVING,
		userEditSaving: bool
	}
}

export function setUserEditSaved(bool) {
	return {
		type: USER_EDIT_SAVED,
		userEditSaved: bool
	}
}

export function editUserUserAccountsLoading(bool) {
	return {
		type: EDIT_USER_USER_ACCOUNTS_LOADING,
		editUserUserAccountsLoading: bool
	}
}

export function usersFetchData(accountId) {
	let url = apiBase + `/account/${accountId}/users`
	return async (dispatch) => {
		try {
			let result = []

			try {
				result = await axios.get(url)
			} catch (error) {
				console.log(error)
			}

			dispatch(usersIsLoading(false))

			if (result.status === 200) {
				let users = { data: [] }
				for (const user of result.data) {
					users.data.push(user)
				}

				dispatch(setUsers(users))
			}
		} catch (error) {
			alert(
				'Error on fetch users usersFetchData: ' + JSON.stringify(error, null, 2)
			)
		}
	}
}

export function fetchUserAccounts(userId) {
	let url = apiBase + `/user/${userId}/accounts`
	return async (dispatch) => {
		dispatch(editUserUserAccountsLoading(true))
		try {
			let result = []

			try {
				result = await axios.get(url)
			} catch (error) {
				console.log(error)
			}

			if (result.status === 200) {
				accountsObjValidation.validate(result.data).catch(function(err) {
					console.log(err.name, err.errors)
					alert('Could not validate accounts data')
				})
				dispatch(usersSetUserAccounts(userId, result.data))
				dispatch(editUserUserAccountsLoading(false))
			}
		} catch (error) {
			alert('Error on fetch user accounts: ' + JSON.stringify(error, null, 2))
		}
	}
}

export function updateUserData(user) {
	let userId = user.userId
	let url = apiBase + `/user/${userId}`
	return async (dispatch) => {
		dispatch(userProfileSaving(true))
		dispatch(setUserEditSaving(true))
		try {
			let myUser = {
				userId: user.userId,
				firstName: user.firstName,
				lastName: user.lastName,
				company: user.company,
				email: user.email,
				userType: user.userType,
				roleId: user.roleId,
				accounts: []
			}

			userObjValidation.validate(myUser).catch(function(err) {
				console.log(err.name, err.errors)
				alert('Could not validate new user')
			})
			delete myUser.accounts
			const result = await axios.patch(url, myUser)
			if (result.status === 200) {
				dispatch(userProfileSaving(false))
				dispatch(userProfileSaved(true))
				dispatch(setUserEditSaving(false))
				dispatch(setUserEditSaved(true))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function updateUserAccounts(user, accounts) {
	if (accounts.length < 1) {
		alert(
			'User not saved. Each user must have at least one account assigned to them.'
		)
		return
	}

	let userId = user.userId
	let url = apiBase + `/user/${userId}/accounts`
	return async (dispatch) => {
		try {
			const result = await axios.patch(url, accounts)
			if (result.status === 200) {
				// dispatch(setUser(result.data.user));
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function usersRemoveUser(userId) {
	return {
		type: USERS_REMOVE_USER,
		userId
	}
}

export function usersAddUser(user) {
	return {
		type: USERS_ADD_USER,
		user
	}
}

export function usersSetUserAccounts(userId, accounts) {
	let payload = { userId, accounts }
	return {
		type: USERS_SET_USER_ACCOUNTS,
		payload
	}
}

export const deleteUser = (userId) => {
	let url = apiBase + `/user/${userId}`
	return (dispatch) => {
		dispatch(usersRemoveUser(userId))
		axios
			.delete(url)
			.then((response) => {
				dispatch(userDeleted(true))
				setTimeout(() => {
					dispatch(userDeleted(false))
				}, 2000)
			})
			.catch((error) => {
				dispatch(userDeletedError(true))
				setTimeout(() => {
					dispatch(userDeletedError(false))
				}, 2000)
			})
	}
}

export const createUser = (user) => {
	user.userName = 'placeholder'
	user.phoneNumber = '123123123'
	delete user.userId
	delete user.internal
	let url = apiBase + `/user/invite`
	return async (dispatch) => {
		dispatch(setUserAdding(true))
		let response = ''
		response = await axios.post(url, user)
		if (response.status === 200) {
			toast.success('User invite sent!')
		} else if (response.response.status === 403) {
			toast.error('This user already exists')
		} else {
			toast.error('An unhandled error occurred')
		}
		dispatch(setUserAdding(false))
	}
}

export const linkRoleToUser = (userId, roleId) => {
	let url = apiBase + `/user?userId=${userId}`
	return (dispatch) => {
		axios
			.post(url, roleId)
			.then((response) => {})
			.catch((error) => {
				console.log('link role to user error')
				console.log(error)
			})
	}
}
