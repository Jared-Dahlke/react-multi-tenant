import {
	SET_AUTH_TOKEN,
	SET_LOGGED_IN,
	SET_USER,
	SET_USER_ID,
	USER_PROFILE_IS_LOADING,
	SET_LOGGING_IN,
	SET_UPDATING_PASSWORD,
	SET_LOGGED_IN_USER_PERMISSIONS,
	SET_RESETTING_PASSWORD
} from '../action-types/auth'
import axios from '../../axiosConfig'
import config from '../../config'
import { userObjValidation } from '../../schemas/schemas'
import toast from 'react-hot-toast'
var encryptor = require('simple-encryptor')(
	process.env.REACT_APP_LOCAL_STORAGE_KEY
)
const apiBase = config.api.userAccountUrl

export function setAuthToken(payload) {
	return { type: SET_AUTH_TOKEN, payload }
}

export function userProfileIsLoading(bool) {
	return {
		type: USER_PROFILE_IS_LOADING,
		userProfileIsLoading: bool
	}
}

export function setUser(payload) {
	return { type: SET_USER, payload }
}

export function setLoggedIn(payload) {
	return { type: SET_LOGGED_IN, payload }
}

export function setLoggingIn(payload) {
	return { type: SET_LOGGING_IN, payload }
}

export function setUserId(payload) {
	return {
		type: SET_USER_ID,
		payload
	}
}

export function setLoggedInUserPermissions(loggedInUserPermissions) {
	return {
		type: SET_LOGGED_IN_USER_PERMISSIONS,
		loggedInUserPermissions
	}
}
export function login(credentials) {
	let url = apiBase + '/authenticate'
	return async (dispatch) => {
		dispatch(setLoggingIn(true))

		const result = await axios.post(url, {
			username: credentials.username,
			password: credentials.password
		})
		if (!result.status) {
			return
		}
		try {
			if (!result.data.jwt) {
				dispatch(setLoggingIn(false))
				toast.error(result.data.message)
				return
			}

			if (result.status === 200) {
				let token = result.data.jwt
				let user = result.data.user
				userObjValidation.validate(user).catch(function(err) {
					console.log(err.name, err.errors)
					alert('Could not validate user data')
				})
				dispatch(setLoggingIn(false))
				dispatch(setAuthToken(token))
				dispatch(setUser(user))
				dispatch(setUserId(user.userId))
				localStorage.setItem('token', token)
				localStorage.setItem('userId', user.userId)

				localStorage.removeItem('permissions')
				if (user.permissions && user.permissions.length > 0) {
					let permNames = []
					for (const p of user.permissions) {
						permNames.push(p.permissionName)
					}
					var encrypted = encryptor.encrypt(JSON.stringify(permNames))
					localStorage.setItem('permissions', encrypted)
				}

				dispatch(setLoggedIn(true))
			}
		} catch (error) {
			dispatch(setLoggingIn(false))
			alert('auth error: ' + error)
		}
	}
}

function parseJwt(token) {
	var base64Url = token.split('.')[1]
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
	var jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map(function(c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
			})
			.join('')
	)

	return JSON.parse(jsonPayload)
}

export function userProfileFetchData() {
	let userId = localStorage.getItem('userId')

	if (!userId) {
		let parsedToken = parseJwt(localStorage.getItem('token'))
		userId = parsedToken.userId
	}

	let url = apiBase + `/user/${userId}`
	return async (dispatch) => {
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				let user = result.data
				userObjValidation.validate(user).catch(function(err) {
					console.log(err.name, err.errors)
					alert('Could not validate user data')
				})
				dispatch(setUser(user))
				dispatch(userProfileIsLoading(false))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function resetPassword(email) {
	let url = apiBase + '/reset-password'
	return async (dispatch) => {
		dispatch(setResettingPassword(true))
		try {
			const result = await axios.post(url, {
				email: email
			})

			dispatch(setResettingPassword(false))

			if (result.status === 200) {
				toast.success('Reset password email sent. Check Your email.')
			} else {
				toast.error(result.response.data.Error)
			}
		} catch (error) {
			dispatch(setResettingPassword(false))
			toast.error(error.response.data.message)
		}
	}
}

export function setUpdatingPassword(bool) {
	return {
		type: SET_UPDATING_PASSWORD,
		updatingPassword: bool
	}
}

export function setResettingPassword(bool) {
	return {
		type: SET_RESETTING_PASSWORD,
		resettingPassword: bool
	}
}

export function changePassword(password, userId, token) {
	let url = `${apiBase}/update-password/${userId}/${token}`
	return async (dispatch) => {
		dispatch(setUpdatingPassword(true))
		try {
			const result = await axios.post(url, {
				password: password
			})
			dispatch(setUpdatingPassword(false))
			if (result.status === 200) {
				toast.success('Password reset. Redirecting you to login page now...')
				setTimeout(() => {
					window.location.href = '/login'
				}, 2000)
			} else {
				toast.error(result.response.data.Error)
			}
		} catch (error) {
			dispatch(setUpdatingPassword(false))

			toast.error(
				'An error ocurred while updating your password. Please try again later.'
			)
		}
	}
}
