
import {SET_AUTH_TOKEN, SET_LOGGED_IN} from '../action-types/auth'
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
          dispatch(setAuthToken(token))
          localStorage.setItem("token", token);
          dispatch(setLoggedIn(true))        
        }

      }
      catch(error) {
        let errorType = error.response.status
        handleError(errorType)
      }
  };
}