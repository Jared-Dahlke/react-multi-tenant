import {
    ADMIN_PERMISSIONS_IS_LOADING,
    SET_ADMIN_ROLE_PERMISSIONS,
    SET_ALL_PERMISSIONS,
    PERMISSIONS_UPDATING,
    PERMISSIONS_ADDED,
    PERMISSIONS_TO_REMOVE,
    PERMISSIONS_REMOVED
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
        case ADMIN_PERMISSIONS_IS_LOADING:
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

export function permissionsArchiving(state = false, action) {
    switch (action.type) {
        case PERMISSIONS_UPDATING:
            return action.permissionsArchiving
        default:
            return state
    }
}

export function permissionsArchived(state = false, action) {
    switch (action.type) {
        case PERMISSIONS_ADDED:
            return action.permissionsArchived
        default:
            return state
    }
}

export function permissionSureToRemove(state = { "show": false }, action) {
    switch (action.type) {
        case PERMISSIONS_TO_REMOVE:
            return action.permissionSureToRemove
        default:
            return state
    }
}

export function permissionsRemoved(state = false, action) {
    switch (action.type) {
        case PERMISSIONS_REMOVED:
            return action.permissionsRemoved
        default:
            return state
    }
}
