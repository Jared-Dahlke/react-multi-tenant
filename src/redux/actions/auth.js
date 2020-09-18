
import {SET_AUTH_TOKEN, SET_LOGGED_IN, SET_USER} from '../action-types/auth'
import axios from '../../axiosConfig'
import config from '../../config'
import handleError from '../../errorHandling'



const apiBase = config.apiGateway.URL;

export function setAuthToken (payload) {
  return {type: SET_AUTH_TOKEN, payload}
}

export function setUser (payload) {
  return {type: SET_USER, payload}
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
        dispatch(setAuthToken(token))
        dispatch(setUser(user))
        localStorage.setItem("token", token);
        localStorage.setItem('userId', user.userId)
        dispatch(setLoggedIn(true))        
      }

    }
    catch(error) {
      alert(error)
      let errorType = error.response.status
      handleError(errorType)
    }
  };
}

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export function userProfileFetchData() {
  let userId = localStorage.getItem('userId')
  
  if(!userId) {
    let parsedToken = parseJwt(localStorage.getItem('token'))
    userId = parsedToken.userId
  }

  let url =  apiBase + `/user/${userId}`
  return async (dispatch) => {
    try {
      const result = await axios.get(url) 
      if (result.status === 200) {
        let user = result.data
        dispatch(setUser(user))
      }
    }
    catch(error) {
      alert(error)
      let errorType = error.response.status
      handleError(errorType)
    }
  };
}
