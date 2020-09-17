//import axios from 'axios';
import {USERS_HAS_ERRORED, USERS_FETCH_DATA_SUCCESS } from '../action-types/users'
import axios from '../../axiosConfig'
import handleError from '../../errorHandling';
import config from '../../config.js'



const apiBase = config.apiGateway.URL

export function usersHasErrored(bool) {
  return {
    type: USERS_HAS_ERRORED,
    hasErrored: bool
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
        dispatch(usersFetchDataSuccess(result))
      }

    }
    catch(error) {    
      alert(error)
      let errorType = error.response.status
      handleError(errorType)
      dispatch(usersHasErrored(true))
    }
  };
}

