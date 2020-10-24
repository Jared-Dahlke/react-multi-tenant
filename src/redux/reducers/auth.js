import {
	SET_AUTH_TOKEN,
	SET_LOGGED_IN,
	SET_ALERT,
	SET_USER,
	SET_USER_ID,
	USER_PROFILE_IS_LOADING,
	SET_LOGGING_IN,
	SET_UPDATING_PASSWORD
} from '../action-types/auth'

import { userObjValidation } from '../../schemas'

let newUser = {
	userId: 0,
	firstName: ' ',
	lastName: ' ',
	company: ' ',
	email: ' ',
	userType: ' ',
	roleId: '',
	accounts: []
}

userObjValidation.validate(newUser).catch(function(err) {
	console.log(err.name, err.errors)
	alert('Could not validate new stubbed user')
})

const initialState = {
	token: null,
	isAuthenticated: null,
	loading: true,
	userProfile: newUser
}

export function authToken(state = null, action) {
	switch (action.type) {
		case SET_AUTH_TOKEN:
			return action.payload
		default:
			return state
	}
}

export function userProfileIsLoading(state = true, action) {
	switch (action.type) {
		case USER_PROFILE_IS_LOADING:
			return action.userProfileIsLoading
		default:
			return state
	}
}

export function user(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				loading: false,
				userProfile: action.payload
			}
		default:
			return state
	}
}

export function isLoggedIn(state = false, action) {
	switch (action.type) {
		case SET_LOGGED_IN:
			return action.payload
		default:
			return state
	}
}

export function loggingIn(state = false, action) {
	switch (action.type) {
		case SET_LOGGING_IN:
			return action.payload
		default:
			return state
	}
}

export function updatingPassword(state = false, action) {
	switch (action.type) {
		case SET_UPDATING_PASSWORD:
			return action.updatingPassword
		default:
			return state
	}
}

export function userId(state = null, action) {
	switch (action.type) {
		case SET_USER_ID:
			return action.payload
		default:
			return state
	}
}

export function alert(state = false, action) {
	switch (action.type) {
		case SET_ALERT:
			return action.payload
		default:
			return state
	}
}
