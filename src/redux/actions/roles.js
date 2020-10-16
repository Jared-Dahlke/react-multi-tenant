//import axios from 'axios';
import {
	ROLES_HAS_ERRORED,
	ROLES_PERMISSIONS_HAS_ERRORED,
	ROLES_IS_LOADING,
	ROLES_PERMISSIONS_IS_LOADING,
	ROLES_FETCH_DATA_SUCCESS,
	ROLES_PERMISSIONS_FETCH_DATA_SUCCESS
} from '../action-types/roles'
import axios from '../../axiosConfig'
import config from '../../config'
import { rolesAndPermissionsObjValidation } from '../../schemas'

const apiBase = config.apiGateway.URL

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
export function rolesFetchDataSuccess(roles) {
	return {
		type: ROLES_FETCH_DATA_SUCCESS,
		roles
	}
}

export function rolesPermissionsFetchDataSuccess(rolesPermissions) {
	return {
		type: ROLES_PERMISSIONS_FETCH_DATA_SUCCESS,
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
				dispatch(rolesFetchDataSuccess(result))
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
				dispatch(rolesPermissionsFetchDataSuccess(result))
				dispatch(rolesPermissionsIsLoading(false))
			}
		} catch (error) {
			alert(error)
			dispatch(rolesPermissionsHasErrored(true))
		}
	}
}
