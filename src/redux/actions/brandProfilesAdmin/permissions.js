import {
    ADMIN_PERMISSIONS_IS_LOADING,
    SET_ADMIN_BRAND_PERMISSIONS,
    SET_ALL_BRAND_PERMISSIONS,
    PERMISSIONS_ARCHIVING,
    PERMISSIONS_ARCHIVED,
    PERMISSIONS_REMOVED,
} from '../../action-types/brandProfilesAdmin/permissions'
import axios from '../../../axiosConfig'
import config from '../../../config.js'
import {
    brandPermissionsObjValidation
} from '../../../schemas/schemas'

// const apiBase = config.api.userAccountUrl
const apiBase = 'http://localhost:4000'

export function setAdminPermissionsIsLoading(bool) {
    return {
        type: ADMIN_PERMISSIONS_IS_LOADING,
        adminPermissionsIsLoading: bool
    }
}

export function setAdminBrandPermissions(permissions) {
    return {
        type: SET_ADMIN_BRAND_PERMISSIONS,
        permissions
    }
}

export function setAllBrandPermissions(permissions) {
    return {
        type: SET_ALL_BRAND_PERMISSIONS,
        permissions_list: permissions
    }
}

export function setPermissionsArchiving(permissionsId) {
    return {
        type: PERMISSIONS_ARCHIVING,
        permissionsArchiving: permissionsId
    }
}

export function setPermissionsArchived(bool) {
    return {
        type: PERMISSIONS_ARCHIVED,
        permissionsArchived: bool
    }
}


export function setPermissionsRemoved(bool) {
    return {
        type: PERMISSIONS_REMOVED,
        permissionsRemoved: bool
    }
}


export const removePermissions = (roleId, permissionId, permissions) => {
    let url = apiBase + `/role/${roleId}/permission/${permissionId}`
    return (dispatch, getState) => {
        // dispatch(setPermissionsSaving(true))
        axios
            .delete(url)
            .then((response) => {
                dispatch(setAdminBrandPermissions(permissions))
                dispatch(setPermissionsRemoved(true))
                // dispatch(setPermissionsSaving(false))
            })
            .catch((error) => {
                //error
            })
    }
}

export const insertPermissions = (roleId, permissionId, permissions) => {
    let url = apiBase + `/role/${roleId}/permission`
    return (dispatch, getState) => {
        // dispatch(setPermissionsSaving(true))
        axios
            .post(url, { "permissionId": permissionId })
            .then((response) => {
                dispatch(setAdminBrandPermissions(permissions))
                dispatch(setPermissionsArchived(true))
                // dispatch(setPermissionsSaving(false))
            })
            .catch((error) => {
                //error
            })
    }
}

export function fetchAdminBrandPermissions() {
    let url = apiBase + `/account/1/roles?permissions=true`
    return async (dispatch) => {
        dispatch(setAdminPermissionsIsLoading(true))
        try {
            const result = await axios.get(url)
            if (result.status === 200) {
                let permissions = result.data

                brandPermissionsObjValidation.validate(permissions).catch(function (err) {
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
                    permissions[p]["captured_permissions"] = per
                }

                dispatch(setAdminBrandPermissions(permissions))
                dispatch(setAdminPermissionsIsLoading(false))
            }
        } catch (error) {
            alert(error)
        }
    }
}

export function fetchAllBrandPermissions() {
    let url = apiBase + `/permission`
    return async (dispatch) => {
        dispatch(setAdminPermissionsIsLoading(true))
        try {
            const result = await axios.get(url)
            if (result.status === 200) {
                let permissions = result.data

                dispatch(setAllBrandPermissions(permissions))
                dispatch(setAdminPermissionsIsLoading(false))
            }
        } catch (error) {
            alert(error)
        }
    }
}
