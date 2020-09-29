import {
  USERS_HAS_ERRORED,
  USERS_FETCH_DATA_SUCCESS,
  USER_DELETED,
  USER_DELETED_ERROR,
  USERS_REMOVE_USER,
  USERS_ADD_USER,
  USER_ADDED,
  USERS_IS_LOADING,
  USERS_SET_USER_ACCOUNTS
} from "../action-types/users";
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
          alert('This account has no users associated with it. There should always be at least one user (yourself). Please contact your inviter')
          window.location.href = '/login'
          localStorage.removeItem('token')
          return
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
      alert('Error on fetch users: ' +JSON.stringify(error,null,2))
      //let errorType = error.response.status;
      //handleError(dispatch, errorType);
      //dispatch(usersHasErrored(true));
    }
  };
}

export function fetchUserAccounts(userId) {
  let url = apiBase + `/user/${userId}/accounts`;
  return async (dispatch) => {
    try {
      
      let result = []
     
      try {

        result = await axios.get(url);

      } catch (error) {
        console.log(error)      
      }
      
      if (result.status === 200) {
        console.log('got accounts for user')
        console.log(result)
        //append to users main object
        dispatch(usersSetUserAccounts(userId, result.data))
      }
    } catch (error) {
      alert('Error on fetch users: ' +JSON.stringify(error,null,2))
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
  
  if(user.password && user.password.length > 0) {
    
  } else {
    user.password = 'testasdfa!'
  }
  
  
  delete user.userId
  delete user.internal
  user.userName = 'placeholder'
  user.phoneNumber= '123123123'
  //user.roles=[{roleId: 11},{roleId: 12}]

  console.log('here')
  console.log(user)

  let url =  apiBase + `/user`
  return (dispatch) => {
    console.log('after dispatch')
    dispatch(usersAddUser(user));
    console.log('after')
    axios.post(url, user)
      .then(response => {
        console.log(response)
        dispatch(userAdded(true))
        setTimeout(() => {
          dispatch(userAdded(false))
        }, 2000);
      })
      .catch(error => {

        console.log('invite user error')
        console.log(error)
        //dispatch(userDeletedError(true))
        //setTimeout(() => {
        //  dispatch(userDeletedError(false))
        //}, 2000);
      })
  };
};

export const linkRoleToUser = (userId, roleId) => {
  
  let url =  apiBase + `/user?userId=${userId}`
  return (dispatch) => {
    axios.post(url, roleId)
      .then(response => {
        console.log(response)      
      })
      .catch(error => {
        console.log('link role to user error')
        console.log(error)       
      })
  };
};
