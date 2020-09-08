export function rolesHasErrored(state = false, action) {
  switch (action.type) {
  case 'ROLES_HAS_ERRORED':
    return action.hasErrored;
  default:
    return state;
  }
}

export function rolesIsLoading(state = false, action) {
  switch (action.type) {
  case 'ROLES_IS_LOADING':
    return action.isLoading;
  default:
    return state;
  }
}

export function roles(state = [], action) {
  switch (action.type) {
  case 'ROLES_FETCH_DATA_SUCCESS':
    return action.roles;
  default:
    return state;
  }
}