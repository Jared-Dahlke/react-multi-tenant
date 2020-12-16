import {
	ROLES_PERMISSIONS_HAS_ERRORED,
	ROLES_PERMISSIONS_IS_LOADING,
	SET_ROLES_PERMISSIONS
} from '../action-types/roles'

export function rolesPermissionsHasErrored(state = false, action) {
	switch (action.type) {
		case ROLES_PERMISSIONS_HAS_ERRORED:
			return action.hasErrored
		default:
			return state
	}
}

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
