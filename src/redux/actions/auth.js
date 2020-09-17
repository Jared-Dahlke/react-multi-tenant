
import {SET_AUTH_TOKEN, SET_LOGGED_IN, USER_LOADED,SET_USER_ID} from '../action-types/auth'
import axios from '../../axiosConfig'
import config from '../../config'
import handleError from '../../errorHandling'



const apiBase = config.apiGateway.URL;

export function setAuthToken (payload) {
  return {type: SET_AUTH_TOKEN, payload}
}

export function setLoggedIn (payload) {
  return {type: SET_LOGGED_IN, payload}
}
export function loadUserProfile(payload){
  return {
    type: USER_LOADED,
    payload
  }
}


export function setUserId(payload){
  return {
    type: SET_USER_ID,
    payload
  }
}

export function getUserProfileById(userId) {
  let url =  apiBase + `/user/${userId}`
  return async (dispatch) => {
    try {
      const result = await axios.get(url) 
      if (result.status === 200) {
        let user = result.data
        dispatch(loadUserProfile(user))
      }
    }
    catch(error) {
      alert(error)
      let errorType = error.response.status
      handleError(errorType)
    }
  };
}

export function login(credentials) {
  let url =  apiBase + '/authenticate'
  return async (dispatch) => {
    try {
      const result = await axios.post(url, {
        username: credentials.username,
        password: credentials.password
      })  

      if (result.status === 200) {
        let token = result.data.jwt
        let user = result.data.user
        let userId = user.userId
        dispatch(setAuthToken(token))
        dispatch(setUserId(userId))
        dispatch(loadUserProfile(user))
        localStorage.setItem("token", token);
        localStorage.setItem("userId",userId);
        dispatch(getUserProfileById(userId));
        dispatch(setLoggedIn(true));

      }

    }
    catch(error) {
      alert(error)
      let errorType = error.response.status
      handleError(errorType)
    }
  };
}