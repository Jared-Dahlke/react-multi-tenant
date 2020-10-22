import {
	USERS_HAS_ERRORED,
	SET_USERS,
	USER_DELETED,
	USER_DELETED_ERROR,
	USERS_REMOVE_USER,
	USERS_ADD_USER,
	USER_ADDED,
	USERS_IS_LOADING,
	USERS_SET_USER_ACCOUNTS,
	EDIT_USER_USER_ACCOUNTS_LOADING,
	USER_PROFILE_SAVED,
	USER_PROFILE_SAVING,
	USER_ADDING,
	USER_EDIT_SAVING,
	USER_EDIT_SAVED
} from '../action-types/users'

export function usersHasErrored(state = false, action) {
	switch (action.type) {
		case USERS_HAS_ERRORED:
			return action.hasErrored
		default:
			return state
	}
}

export function usersIsLoading(state = true, action) {
	switch (action.type) {
		case USERS_IS_LOADING:
			return action.usersIsLoading
		default:
			return state
	}
}

export function userProfileSaving(state = false, action) {
	switch (action.type) {
		case USER_PROFILE_SAVING:
			return action.userProfileSaving
		default:
			return state
	}
}
export function userProfileSaved(state = false, action) {
	switch (action.type) {
		case USER_PROFILE_SAVED:
			return action.userProfileSaved
		default:
			return state
	}
}

export function editUserUserAccountsLoading(state = true, action) {
	switch (action.type) {
		case EDIT_USER_USER_ACCOUNTS_LOADING:
			return action.editUserUserAccountsLoading
		default:
			return state
	}
}

export function userDeleted(state = false, action) {
	switch (action.type) {
		case USER_DELETED:
			return action.userDeleted
		default:
			return state
	}
}

export function userAdded(state = false, action) {
	switch (action.type) {
		case USER_ADDED:
			return action.userAdded
		default:
			return state
	}
}

export function userAdding(state = false, action) {
	switch (action.type) {
		case USER_ADDING:
			return action.userAdding
		default:
			return state
	}
}

export function userEditSaving(state = false, action) {
	switch (action.type) {
		case USER_EDIT_SAVING:
			return action.userEditSaving
		default:
			return state
	}
}
export function userEditSaved(state = false, action) {
	switch (action.type) {
		case USER_EDIT_SAVED:
			return action.userEditSaved
		default:
			return state
	}
}

export function userDeletedError(state = false, action) {
	switch (action.type) {
		case USER_DELETED_ERROR:
			return action.userDeleted
		default:
			return state
	}
}

export function users(state = [], action) {
	let users = {}
	let newState = []
	switch (action.type) {
		case SET_USERS:
			return action.users
		case USERS_REMOVE_USER:
			newState = [
				...state.data.filter(({ userId }) => userId !== action.userId)
			]
			users = { data: newState }
			return users
		case USERS_ADD_USER:
			let stateData = []
			if (state.data && state.data.length > 0) {
				stateData = JSON.parse(JSON.stringify(state.data))
			}
			stateData.push(action.user)
			users = { data: stateData }
			return users
		case USERS_SET_USER_ACCOUNTS:
			let stateCopy = []
			if (state.data && state.data.length > 0) {
				stateCopy = JSON.parse(JSON.stringify(state.data))
			}
			for (const user of stateCopy) {
				if (user.userId === action.payload.userId)
					user.accounts = action.payload.accounts
			}
			users = { data: stateCopy }
			return users
		default:
			return state
	}
}
