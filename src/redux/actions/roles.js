//import axios from 'axios';
import {
	ROLES_HAS_ERRORED,
	ROLES_PERMISSIONS_HAS_ERRORED,
	ROLES_IS_LOADING,
	ROLES_PERMISSIONS_IS_LOADING,
	SET_ROLES,
	SET_ROLES_PERMISSIONS
} from '../action-types/roles'
import axios from '../../axiosConfig'
import config from '../../config'
import {
	rolesAndPermissionsObjValidation,
	rolesObjValidation
} from '../../schemas/schemas'

const apiBase = config.api.userAccountUrl

export function rolesHasErrored(bool) {
	return {
		type: ROLES_HAS_ERRORED,
		hasErrored: bool
	}
}

export function rolesPermissionsHasErrored(bool) {
	return {
		type: ROLES_PERMISSIONS_HAS_ERRORED,
		hasErrored: bool
	}
}
export function rolesIsLoading(bool) {
	return {
		type: ROLES_IS_LOADING,
		isLoading: bool
	}
}

export function rolesPermissionsIsLoading(bool) {
	return {
		type: ROLES_PERMISSIONS_IS_LOADING,
		isLoading: bool
	}
}
export function setRoles(roles) {
	return {
		type: SET_ROLES,
		roles
	}
}

export function setRolesPermissions(rolesPermissions) {
	return {
		type: SET_ROLES_PERMISSIONS,
		rolesPermissions
	}
}

export function rolesFetchData(accountId) {
	return async (dispatch) => {
		dispatch(rolesIsLoading(true))

		try {
			let url = apiBase + `/account/${accountId}/roles?permissions=false`
			const result = await axios.get(url)
			dispatch(rolesIsLoading(false))
			if (result.status === 200) {
				if (!result.data[0]) {
					alert(
						'This account has no roles associated with it. Please contact your inviter'
					)
					//window.location.href = '/login'
					//localStorage.removeItem('token')
					//return
				}
				rolesAndPermissionsObjValidation
					.validate(result.data)
					.catch(function(err) {
						console.log(err.name, err.errors)
						alert('Could not validate roles data')
					})
				dispatch(setRoles(result))
			}
		} catch (error) {
			alert(error)
			dispatch(rolesHasErrored(true))
		}
	}
}

export function rolesPermissionsFetchData(accountId) {
	return async (dispatch) => {
		// dispatch(rolesPermissionsIsLoading(true));

		try {
			let url = apiBase + `/account/${accountId}/roles?permissions=true`
			const result = await axios.get(url)

			if (result.status === 200) {
				if (!result.data[0]) {
					alert(
						'This account has no roles associated with it. Please contact your inviter'
					)
					//window.location.href = '/login'
					//localStorage.removeItem('token')
					//return
				}
				rolesAndPermissionsObjValidation
					.validate(result.data)
					.catch(function(err) {
						console.log(err.name, err.errors)
						alert('Could not validate roles Permissions data')
					})
				dispatch(setRolesPermissions(result))
				dispatch(rolesPermissionsIsLoading(false))
			}
		} catch (error) {
			alert(error)
			dispatch(rolesPermissionsHasErrored(true))
		}
	}
}
