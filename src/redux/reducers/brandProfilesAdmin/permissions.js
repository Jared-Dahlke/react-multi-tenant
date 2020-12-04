import {
    ADMIN_PERMISSIONS_IS_LOADING,
    SET_ADMIN_BRAND_PERMISSIONS,
    SET_ALL_BRAND_PERMISSIONS,
    PERMISSIONS_ARCHIVING,
    PERMISSIONS_ARCHIVED,
    PERMISSIONS_REMOVED
} from '../../action-types/brandProfilesAdmin/permissions'

export function permissions(state = [], action) {
    switch (action.type) {
        case SET_ADMIN_BRAND_PERMISSIONS:
            return action.permissions
        default:
            return state
    }
}

export function permissions_list(state = [], action) {
    switch (action.type) {
        case SET_ALL_BRAND_PERMISSIONS:
            return action.permissions_list
        default:
            return state
    }
}

export function permissionsArchiving(state = false, action) {
    switch (action.type) {
        case PERMISSIONS_ARCHIVING:
            return action.permissionsArchiving
        default:
            return state
    }
}

export function permissionsArchived(state = false, action) {
    switch (action.type) {
        case PERMISSIONS_ARCHIVED:
            return action.permissionsArchived
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
