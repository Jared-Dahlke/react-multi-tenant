import {USERS_HAS_ERRORED, USERS_FETCH_DATA_SUCCESS, USER_DELETED} from '../action-types/users'

export function usersHasErrored(state = false, action) {
  switch (action.type) {
  case USERS_HAS_ERRORED:
    return action.hasErrored;
  default:
    return state;
  }
}

export function userDeleted(state = false, action) {
  switch (action.type) {
  case USER_DELETED:
    return action.userDeleted;
  default:
    return state;
  }
}

export function users(state = [], action) {
  switch (action.type) {
  case USERS_FETCH_DATA_SUCCESS:
    return action.users;
  default:
    return state;
  }
}
