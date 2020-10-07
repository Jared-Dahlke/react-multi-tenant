import {
  USERS_HAS_ERRORED,
  USERS_FETCH_DATA_SUCCESS,
  USER_DELETED,
  USER_DELETED_ERROR,
  USERS_REMOVE_USER,
  USERS_ADD_USER,
  USER_ADDED,
  USERS_IS_LOADING,
  USERS_SET_USER_ACCOUNTS,
  EDIT_USER_USER_ACCOUNTS_LOADING,
} from "../action-types/users";
import {
  SET_ALERT,
} from "../action-types/auth";
import axios from "../../axiosConfig";
import handleError from "../../errorHandling";
import config from "../../config.js";
import { User } from "../../models/user";
import { setUser } from "./auth";

const apiBase = config.apiGateway.URL;

export function usersHasErrored(bool) {
  return {
    type: USERS_HAS_ERRORED,
    hasErrored: bool,
  };
}

export function userDeleted(bool) {
  return {
    type: USER_DELETED,
    userDeleted: bool,
  };
}
export function userAdded(bool) {
  return {
    type: USER_ADDED,
    userAdded: bool,
  };
}
export function userDeletedError(bool) {
  return {
    type: USER_DELETED_ERROR,
    userDeleted: bool,
  };
}

export function usersFetchDataSuccess(users) {
  return {
    type: USERS_FETCH_DATA_SUCCESS,
    users,
  };
}

export function usersIsLoading(bool) {
  return {
    type: USERS_IS_LOADING,
    usersIsLoading: bool,
  };
}

export function setAlert(payload) {
  return { type: SET_ALERT, payload };
}

export function editUserUserAccountsLoading(bool) {
  return {
    type: EDIT_USER_USER_ACCOUNTS_LOADING,
    editUserUserAccountsLoading: bool
  }
}

export function usersFetchData(accountId) {
  let url = apiBase + `/account/${accountId}/users`;
  return async (dispatch) => {
    try {
      let params = {     
        roles: true
      }

      let result = []
     
      try {

        result = await axios.get(url, {
          params,
        });

      } catch (error) {
        console.log(error)
        if(result.status === 401) {
          handleError(dispatch, result.status);
        }
      }

      dispatch(usersIsLoading(false))
      
      if (result.status === 200) {
        if(!result.data[0]) {
          //alert('This account has no users associated with it. There should always be at least one user (yourself). Please contact your inviter')
          //window.location.href = '/login'
          //localStorage.removeItem('token')
          //return
        }
        let users = { data: [] };
        for (const user of result.data) {

          let roles = [];
          try {

            
            for (const role of user.roles) {
              if (role.roleId) roles.push(role.roleId);
            }

          } catch (error) {
            alert('Error trying to add roles to /user in the fetchUsers function: ' + error)
            return
          }
                  
          try{
            let newUser = new User(
              user.userId,
              user.firstName,
              user.lastName,
              user.company,
              user.email,
              user.userType,
              roles
            );
            users.data.push(newUser);

          } catch (error) {
            
          }
          
        }
        dispatch(usersFetchDataSuccess(users));
      }
    } catch (error) {
      alert('Error on fetch users usersFetchData: ' +JSON.stringify(error,null,2))
    }
  };
}

export function fetchUserAccounts(userId) {
  
  let url = apiBase + `/user/${userId}/accounts`;
  return async (dispatch) => {
    dispatch(editUserUserAccountsLoading(true))
    try {
      
      let result = []
     
      try {

        result = await axios.get(url);

      } catch (error) {
        console.log(error)      
      }
      
      if (result.status === 200) {
        dispatch(usersSetUserAccounts(userId, result.data))
        dispatch(editUserUserAccountsLoading(false))
      }
    } catch (error) {
      alert('Error on fetch user accounts: ' + JSON.stringify(error,null,2))
    }
  };
}

export function updateUserData(user) {
  let userId = user.userId;
  let url = apiBase + `/user/${userId}`;
  return async (dispatch) => {
    try {
      let myUser = new User(user.userId, user.firstName, user.lastName, user.company, user.email, user.userType, [], [])
      delete myUser.accounts
      delete myUser.roles
      const result = await axios.patch(url, myUser);
      if (result.status === 200) {
       // console.log('updating user through update user data')
       // console.log(result.data.user)
       // dispatch(setUser(result.data.user));
      }
    } catch (error) {
      alert(error);
    }
  };
}

export function updateUserRoles(user, roles) {
  let userId = user.userId;
  let url = apiBase + `/user/${userId}/roles`;
  return async (dispatch) => {
    try {
      const result = await axios.patch(url, roles);
      if (result.status === 200) {
       // dispatch(setUser(result.data.user));
      }
    } catch (error) {
      alert(error);
    }
  };
}


export function updateUserAccounts(user, accounts) {
  if(accounts.length < 1) {
    alert('User not saved. Each user must have at least one account assigned to them.')
    return
  }
  
  let userId = user.userId;
  let url = apiBase + `/user/${userId}/accounts`;
  return async (dispatch) => {
    try {
      const result = await axios.patch(url, accounts);
      if (result.status === 200) {
       // dispatch(setUser(result.data.user));
      }
    } catch (error) {
      alert(error);
    }
  };
}

export function usersRemoveUser(userId) {
  return {
    type: USERS_REMOVE_USER,
    userId,
  };
}

export function usersAddUser(user) {
  return {
    type: USERS_ADD_USER,
    user,
  };
}


export function usersSetUserAccounts(userId, accounts) {
  let payload = {userId, accounts}
  return {
    type: USERS_SET_USER_ACCOUNTS,
    payload,
  };
}

export const deleteUser = (userId) => {
  let url = apiBase + `/user/${userId}`;
  return (dispatch) => {
    dispatch(usersRemoveUser(userId));
    axios
      .delete(url)
      .then((response) => {
        dispatch(userDeleted(true));
        setTimeout(() => {
          dispatch(userDeleted(false));
        }, 2000);
      })
      .catch((error) => {
        dispatch(userDeletedError(true));
        setTimeout(() => {
          dispatch(userDeletedError(false));
        }, 2000);
      });
  };
};




export const createUser = (user) => {
  
  
  
  delete user.userId
  delete user.internal
  user.userName = 'placeholder'
  user.phoneNumber= '123123123'

  let url =  apiBase + `/user/invite`
  return (dispatch) => {
    dispatch(usersAddUser(user));
    axios.post(url, user)
      .then(response => {
        dispatch(userAdded(true))
        setTimeout(() => {
          dispatch(userAdded(false))
        }, 2000);
      })
      .catch(error => {
        console.log('invite user error')
        console.log(error)
      })
  };
};

export const linkRoleToUser = (userId, roleId) => {
  
  let url =  apiBase + `/user?userId=${userId}`
  return (dispatch) => {
    axios.post(url, roleId)
      .then(response => {  
      })
      .catch(error => {
        console.log('link role to user error')
        console.log(error)       
      })
  };
};

export function updatePassword(userId, oldPassword, password) {
  let url = `${apiBase}/user/${userId}/update-password`;
  return async (dispatch) => {
    try {
      const result = await axios.post(url, {
        password: password,
        oldPassword: oldPassword
      });

      if (result.status === 200) {
        dispatch(setAlert({show: true, message: "Password has been updated.", severity: "success"}));
      } else {
        dispatch(setAlert({show: true, message: result.response.data.Error, severity: "error"}));
      }
    } catch (error) {
      dispatch(setAlert({show: true, message: error.response.data.message, severity: "error"}));
    }
  };
}
