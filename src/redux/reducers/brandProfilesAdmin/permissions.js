import {
    SET_PERMISSIONS_LOADING,
    SET_ADMIN_ROLE_PERMISSIONS,
    SET_ALL_PERMISSIONS,
    SET_PERMISSIONS_UPDATING,
    SET_PERMISSIONS_ADDED,
    SET_PERMISSIONS_TO_REMOVE,
    SET_PERMISSIONS_REMOVED
} from '../../action-types/brandProfilesAdmin/permissions'

export function permissions(state = [], action) {
    switch (action.type) {
        case SET_ADMIN_ROLE_PERMISSIONS:
            return action.permissions
        default:
            return state
    }
}

export function permissionsIsLoading(state = true, action) {
    switch (action.type) {
        case SET_PERMISSIONS_LOADING:
            return action.adminPermissionsIsLoading
        default:
            return state
    }
}

export function permissions_list(state = [], action) {
    switch (action.type) {
        case SET_ALL_PERMISSIONS:
            return action.permissions_list
        default:
            return state
    }
}

export function permissionsUpdating(state = false, action) {
    switch (action.type) {
        case SET_PERMISSIONS_UPDATING:
            return action.permissionsUpdating
        default:
            return state
    }
}

export function permissionsAdded(state = false, action) {
    switch (action.type) {
        case SET_PERMISSIONS_ADDED:
            return action.permissionsAdded
        default:
            return state
    }
}

export function permissionSureToRemove(state = { "show": false }, action) {
    switch (action.type) {
        case SET_PERMISSIONS_TO_REMOVE:
            return action.permissionSureToRemove
        default:
            return state
    }
}

export function permissionsRemoved(state = false, action) {
    switch (action.type) {
        case SET_PERMISSIONS_REMOVED:
            return action.permissionsRemoved
        default:
            return state
    }
}
