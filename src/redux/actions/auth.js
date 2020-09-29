import {
  SET_AUTH_TOKEN,
  SET_LOGGED_IN,
  SET_USER,
  SET_USER_ID,
  SET_SHOW_ALERT,
  USER_PROFILE_IS_LOADING
} from "../action-types/auth";
import axios from "../../axiosConfig";
import config from "../../config";
import handleError from "../../errorHandling";

const apiBase = config.apiGateway.URL;

export function setAuthToken(payload) {
  return { type: SET_AUTH_TOKEN, payload };
}

export function setShowAlert(payload) {
  return { type: SET_SHOW_ALERT, payload };
}

export function userProfileIsLoading(bool) {
  return {
    type: USER_PROFILE_IS_LOADING,
    userProfileIsLoading: bool,
  };
}

export function setUser(payload) {
  return { type: SET_USER, payload };
}

export function setLoggedIn(payload) {
  return { type: SET_LOGGED_IN, payload };
}

export function setUserId(payload) {
  return {
    type: SET_USER_ID,
    payload,
  };
}

export function getUserProfileById(userId) {
  let url = apiBase + `/user/${userId}`;
  return async (dispatch) => {
    try {
      const result = await axios.get(url);
      if (result.status === 200) {
        let user = result.data;
        dispatch(setUser(user));
      }
    } catch (error) {
      alert(error);
      let errorType = error.response.status;
      handleError(errorType);
    }
  };
}

export function login(credentials) {
  let url = apiBase + "/authenticate";
  return async (dispatch) => {
    try {
      const result = await axios.post(url, {
        username: credentials.username,
        password: credentials.password,
      });

      if (!result.data.jwt) {
        alert(
          "We were unable to authenticate this user. Please try again later."
        );
        return;
      }

      if (result.status === 200) {
        let token = result.data.jwt;
        let user = result.data.user;
        dispatch(setAuthToken(token));
        dispatch(setUser(user));
        dispatch(setUserId(user.userId));
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.userId);
        dispatch(setLoggedIn(true));
      }
    } catch (error) {
      alert(error);
      let errorType = error.response.status;
      handleError(dispatch, errorType);
    }
  };
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function userProfileFetchData() {
  let userId = localStorage.getItem("userId");

  if (!userId) {
    let parsedToken = parseJwt(localStorage.getItem("token"));
    userId = parsedToken.userId;
  }

  let url = apiBase + `/user/${userId}`;
  return async (dispatch) => {
    try {
      const result = await axios.get(url);
      if (result.status === 200) {
        let user = result.data;
        dispatch(setUser(user));
        dispatch(userProfileIsLoading(false))
      }
    } catch (error) {
      alert(error);
      let errorType = error.response.status;
      handleError(dispatch, errorType);
    }
  };
}

export function resetPassword(email) {
  let url = apiBase + "/reset-password";
  return async (dispatch) => {
    try {
      const result = await axios.post(url, {
        email: email,
      });

      if (result.status === 200) {
        dispatch(setShowAlert(true));
      }
    } catch (error) {
      alert(error);
      let errorType = error.response.status;
      handleError(dispatch, errorType);
    }
  };
}

export function changePassword(password, userId, token) {
  let url = `${apiBase}/update-password/${userId}/${token}`;
  return async (dispatch) => {
    try {
      const result = await axios.post(url, {
        password: password,
      });

      if (result.status === 200) {
        
        window.location.href = '/login'
        //dispatch(setShowAlert(true));
      }
    } catch (error) {
      alert(error);     
    }
  };
}
