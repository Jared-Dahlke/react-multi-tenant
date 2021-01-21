import {
	ROLES_PERMISSIONS_IS_LOADING,
	SET_ROLES_PERMISSIONS
} from '../action-types/roles'
import axios from '../../axiosConfig'
import config from '../../config'
import { rolesAndPermissionsObjValidation } from '../../schemas/schemas'

const apiBase = config.api.userAccountUrl

export function rolesPermissionsIsLoading(bool) {
	return {
		type: ROLES_PERMISSIONS_IS_LOADING,
		isLoading: bool
	}
}

export function setRolesPermissions(rolesPermissions) {
	return {
		type: SET_ROLES_PERMISSIONS,
		rolesPermissions
	}
}

export function rolesPermissionsFetchData() {
	return async (dispatch) => {
		dispatch(rolesPermissionsIsLoading(true))

		try {
			let url = apiBase + `/role?permissions=true`
			const result = await axios.get(url)

			if (result.status === 200) {
				if (!result.data[0]) {
					alert(
						'This account has no roles associated with it. Please contact your inviter'
					)
				}
				rolesAndPermissionsObjValidation
					.validate(result.data)
					.catch(function (err) {
						console.log(err.name, err.errors)
						alert('Could not validate roles Permissions data')
					})
				dispatch(setRolesPermissions(result))
				dispatch(rolesPermissionsIsLoading(false))
			}
		} catch (error) {
			alert(error)
		}
	}
}
