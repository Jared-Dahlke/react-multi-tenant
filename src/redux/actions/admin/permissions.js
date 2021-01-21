import {
	SET_PERMISSIONS_LOADING,
	SET_ADMIN_ROLE_PERMISSIONS,
	SET_ALL_PERMISSIONS,
	SET_PERMISSIONS_UPDATING,
	SET_PERMISSIONS_TO_REMOVE
} from '../../action-types/admin/permissions'
import axios from '../../../axiosConfig'
import config from '../../../config.js'
import { adminPermissionsObjValidation } from '../../../schemas/schemas'

const apiBase = config.api.userAccountUrl

export function setAdminPermissionsIsLoading(bool) {
	return {
		type: SET_PERMISSIONS_LOADING,
		adminPermissionsIsLoading: bool
	}
}

export function setAdminRolePermissions(permissions) {
	return {
		type: SET_ADMIN_ROLE_PERMISSIONS,
		permissions
	}
}

export function setAllPermissions(permissions) {
	return {
		type: SET_ALL_PERMISSIONS,
		permissions_list: permissions
	}
}

export function setPermissionsUpdating(bool) {
	return {
		type: SET_PERMISSIONS_UPDATING,
		permissionsUpdating: bool
	}
}

export function setPermissionSureToRemove(pData) {
	return {
		type: SET_PERMISSIONS_TO_REMOVE,
		permissionSureToRemove: pData
	}
}

export const removePermissions = (roleId, permissionId, permissions) => {
	let url = apiBase + `/role/${roleId}/permission/${permissionId}`
	return (dispatch, getState) => {
		dispatch(setPermissionsUpdating(true))
		axios
			.delete(url)
			.then((response) => {
				dispatch(setAdminRolePermissions(permissions))
				toast.success('Permissions removed!')
				dispatch(setPermissionsUpdating(false))
			})
			.catch((error) => {
				alert(error)
			})
	}
}

export const insertPermissions = (roleId, permissionId, permissions) => {
	let url = apiBase + `/role/${roleId}/permission`
	return (dispatch, getState) => {
		dispatch(setPermissionsUpdating(true))
		axios
			.post(url, { permissionId: permissionId })
			.then((response) => {
				dispatch(setAdminRolePermissions(permissions))
				toast.success('Permissions added!')
				dispatch(setPermissionsUpdating(false))
			})
			.catch((error) => {
				alert(error)
			})
	}
}

export function fetchAdminRolePermissions() {
	let url = apiBase + `/account/1/roles?permissions=true`
	return async (dispatch) => {
		dispatch(setAdminPermissionsIsLoading(true))
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				let permissions = result.data

				adminPermissionsObjValidation
					.validate(permissions)
					.catch(function(err) {
						console.log(err.name, err.errors)
						alert(
							'We received different API data than expected, see the console log for more details.'
						)
					})

				for (var p in permissions) {
					var per = []
					for (var pp in permissions[p].permissions) {
						per.push(permissions[p].permissions[pp].permissionId)
					}
					permissions[p]['captured_permissions'] = per
				}

				dispatch(setAdminRolePermissions(permissions))
				dispatch(setAdminPermissionsIsLoading(false))
			}
		} catch (error) {
			alert(error)
		}
	}
}

export function fetchAllPermissions() {
	let url = apiBase + `/permission`
	return async (dispatch) => {
		dispatch(setAdminPermissionsIsLoading(true))
		try {
			const result = await axios.get(url)
			if (result.status === 200) {
				let permissions = result.data

				dispatch(setAllPermissions(permissions))
				dispatch(setAdminPermissionsIsLoading(false))
			}
		} catch (error) {
			alert(error)
		}
	}
}
