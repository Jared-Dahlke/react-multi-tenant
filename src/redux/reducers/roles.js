import {ROLES_HAS_ERRORED, ROLES_PERMISSIONS_HAS_ERRORED, ROLES_IS_LOADING, ROLES_FETCH_DATA_SUCCESS, ROLES_PERMISSIONS_FETCH_DATA_SUCCESS} from '../action-types/roles'

export function rolesHasErrored(state = false, action) {
  switch (action.type) {
  case ROLES_HAS_ERRORED:
    return action.hasErrored;
  default:
    return state;
  }
}

export function rolesPermissionsHasErrored(state = false, action) {
  switch (action.type) {
  case ROLES_PERMISSIONS_HAS_ERRORED:
    return action.hasErrored;
  default:
    return state;
  }
}


export function rolesIsLoading(state = false, action) {
  switch (action.type) {
  case ROLES_IS_LOADING:
    return action.isLoading;
  default:
    return state;
  }
}

export function roles(state = [], action) {
  switch (action.type) {
  case ROLES_FETCH_DATA_SUCCESS:
    return action.roles;
  default:
    return state;
  }
}

export function rolesPermissions(state = [], action) {
  switch (action.type) {
  case ROLES_PERMISSIONS_FETCH_DATA_SUCCESS:
    return action.rolesPermissions;
  default:
    return state;
  }
}