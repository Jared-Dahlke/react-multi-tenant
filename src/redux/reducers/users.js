import {USERS_HAS_ERRORED, USERS_FETCH_DATA_SUCCESS, USER_DELETED, USER_DELETED_ERROR, USERS_REMOVE_USER, USERS_ADD_USER, USER_ADDED} from '../action-types/users'


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

export function userAdded(state = false, action) {
  switch (action.type) {
  case USER_ADDED:
    return action.userAdded;
  default:
    return state;
  }
}


export function userDeletedError(state = false, action) {
  switch (action.type) {
  case USER_DELETED_ERROR:
    return action.userDeleted;
  default:
    return state;
  }
}

export function users(state = [], action) {
  let users = {}
  let newState = []
  switch (action.type) {
  case USERS_FETCH_DATA_SUCCESS:
    return action.users;
  case USERS_REMOVE_USER:
    newState = [...state.data.filter(({ userId }) => userId !== action.userId)]
    users = {data: newState}
    return users;
  case USERS_ADD_USER:
    console.log('adding user')
    console.log(state.data)
    let stateData = []
    if(state.data && state.data.length > 0) {
      stateData = JSON.parse(JSON.stringify(state.data))
    }  
    console.log('added user')
    stateData.push(action.user)
    users = {data: stateData}
    return users;
  default:
    return state;
  }
}

