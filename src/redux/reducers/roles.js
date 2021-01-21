import {
	ROLES_PERMISSIONS_IS_LOADING,
	SET_ROLES_PERMISSIONS
} from '../action-types/roles'

export function rolesPermissionsIsLoading(state = true, action) {
	switch (action.type) {
		case ROLES_PERMISSIONS_IS_LOADING:
			return action.isLoading
		default:
			return state
	}
}

export function rolesPermissions(state = [], action) {
	switch (action.type) {
		case SET_ROLES_PERMISSIONS:
			return action.rolesPermissions
		default:
			return state
	}
}
