//import axios from 'axios';
import {USERS_HAS_ERRORED, USERS_FETCH_DATA_SUCCESS, USER_DELETED, USER_DELETED_ERROR, USERS_REMOVE_USER, USERS_ADD_USER} from '../action-types/users'
import axios from '../../axiosConfig'
import handleError from '../../errorHandling';
import config from '../../config.js'
import {User} from '../../models/user'
const apiBase = config.apiGateway.URL

const mockRoles = [
  11,12
]


export function usersHasErrored(bool) {
  return {
    type: USERS_HAS_ERRORED,
    hasErrored: bool
  };
}

export function userDeleted(bool) {
  return {
    type: USER_DELETED,
    userDeleted: bool
  };
}
export function userDeletedError(bool) {
  return {
    type: USER_DELETED_ERROR,
    userDeleted: bool
  };
}

export function usersFetchDataSuccess(users) {
  return {
    type: USERS_FETCH_DATA_SUCCESS,
    users
  };
}


export function usersFetchData() {

  let url =  apiBase + '/user'
  return async (dispatch) => {
    try {

      const result = await axios.get(url)       
     
      if (result.status === 200) {
        let users = {data: []}
        for (const user of result.data) {
          let newUser = new User(user.userId, user.firstName, user.lastName, user.company, user.email, user.userType, mockRoles)
          users.data.push(newUser)
        }
        dispatch(usersFetchDataSuccess(users))
      }

    }
    catch(error) {    
      let errorType = error.response.status
      handleError(dispatch, errorType)
      dispatch(usersHasErrored(true))
    }
  };
}

export function usersRemoveUser(userId) {
  return {
      type: USERS_REMOVE_USER,
      userId
  };
}

export function usersAddUser(user) {
  return {
      type: USERS_ADD_USER,
      user
  };
}


export const deleteUser = (userId) => {
  
  let url =  apiBase + `/user/${userId}`
  return (dispatch) => {
      dispatch(usersRemoveUser(userId))
      axios.delete(url)
      .then(response => {
          dispatch(userDeleted(true))
          setTimeout(() => {
            dispatch(userDeleted(false))
          }, 2000);
      })
      .catch(error => {
          dispatch(userDeletedError(true))
          setTimeout(() => {
            dispatch(userDeletedError(false))
          }, 2000);
      })
  }
}

export const inviteUser = (user) => {
  
  //let url =  apiBase + `/user/${userId}`
  return (dispatch) => {
      dispatch(usersAddUser(user))
      //axios.delete(url)
      //.then(response => {
      //    dispatch(userDeleted(true))
      //    setTimeout(() => {
      //      dispatch(userDeleted(false))
      //    }, 2000);
      //})
      //.catch(error => {
      //    dispatch(userDeletedError(true))
      //    setTimeout(() => {
      //      dispatch(userDeletedError(false))
      //    }, 2000);
      //})
  }
}
     