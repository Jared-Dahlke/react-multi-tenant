import {
 
  ACCOUNTS_FETCH_DATA_SUCCESS,
  SET_CURRENT_ACCOUNT_ID,
  SET_CURRENT_ACCOUNT,
  TREE_ACCOUNTS_CONVERT_DATA_SUCCESS,
  EDIT_ACCOUNT_ACCOUNT_USERS_LOADING,
  ACCOUNTS_SET_ACCOUNT_USERS
} from "../action-types/accounts";
import axios from "../../axiosConfig";
import handleError from "../../errorHandling";
import config from "../../config.js";
import {userProfileFetchData, setAuthToken} from '../actions/auth'
import {usersFetchData, usersFetchDataSuccess, usersIsLoading} from '../actions/users'
import {rolesFetchData, rolesFetchDataSuccess, rolesPermissionsFetchData, rolesPermissionsFetchDataSuccess, rolesPermissionsIsLoading} from '../actions/roles'
import {brandProfilesFetchDataSuccess, fetchBrandProfiles} from '../actions/brandProfiles'
import {findAccountNodeByAccountId} from '../../utils'
import { useHistory } from "react-router-dom";
import { editUserUserAccountsLoading } from "../actions/users";
//import { Account } from "../../models/user";


const apiBase = config.apiGateway.URL;


export function accountsFetchDataSuccess(accounts) {
  return {
    type: ACCOUNTS_FETCH_DATA_SUCCESS,
    accounts,
  };
}


export function treeAccountsConvertDataSuccess(treeAccounts) {
  return {
    type: TREE_ACCOUNTS_CONVERT_DATA_SUCCESS,
    treeAccounts,
  };
}

export function setCurrentAccountId(accountId) {
  return {
    type: SET_CURRENT_ACCOUNT_ID,
    accountId,
  };
}

export function setCurrentAccount(accountId) {
  return {
    type: SET_CURRENT_ACCOUNT,
    accountId,
  };
}




export function clearSiteData() {
  return (dispatch) => {

    dispatch(rolesPermissionsIsLoading(true))
    dispatch(usersIsLoading(true))
    dispatch(editUserUserAccountsLoading(true))
    dispatch(accountsFetchDataSuccess([]));
    dispatch(setCurrentAccountId(null))
    dispatch(usersFetchDataSuccess([]))
    dispatch(rolesFetchDataSuccess([]))
    dispatch(rolesPermissionsFetchDataSuccess([]))
    dispatch(brandProfilesFetchDataSuccess([]))

  }
  
}


function convertToTree(accountsdata) {
let accounts = accountsdata.data
  if(accounts.length === 1) return accounts

  let ta = [
    {
      accountId: 0, 
      accountName: 'You',
      accountTypeName: 'You',
      children: [],
      
    }
  ]
  for (const account of accounts) {
    ta[0].children.push(account)
  }

  return ta
}

export function fetchSiteData(accountId) {

  return async (dispatch) => {
      try {

      let userId = localStorage.getItem('userId')

      let accountsUrl = apiBase + `/user/${userId}/accounts`;
      
      let result = await axios.get(accountsUrl);
      let accounts = { data: result.data };
      if(!result.data[0]) {
        alert('You have no accounts assigned to you. Please contact your inviter')
        //window.location.href = '/login'
        //localStorage.removeItem('token')
        //return
      }

      dispatch(accountsFetchDataSuccess(accounts));

      let accountsCopy = JSON.parse(JSON.stringify(accounts))
      let convertedAccounts = convertToTree(accountsCopy)
      dispatch(treeAccountsConvertDataSuccess(convertedAccounts))

      if(!accountId) {
        let accountIdFromLocalStorage = localStorage.getItem('currentAccountId')
        if(accountIdFromLocalStorage) {
          let userStillHasAccessToThisAccount = false

          let node = findAccountNodeByAccountId(accountIdFromLocalStorage, result.data)
          if(node) {
            userStillHasAccessToThisAccount = true
          }
    
          if(!userStillHasAccessToThisAccount) {
            accountId = result.data[0].accountId
          } else {
            accountId = accountIdFromLocalStorage
          }
        } else {
          accountId = result.data[0].accountId
        }
      }

      localStorage.setItem('currentAccountId', accountId)
      dispatch(setCurrentAccount(accountId))
      dispatch(setCurrentAccountId(accountId))
      dispatch(userProfileFetchData())
      dispatch(usersFetchData(accountId))
      dispatch(rolesPermissionsFetchData(accountId))
      dispatch(rolesFetchData(accountId))
      dispatch(fetchBrandProfiles(accountId))

    } catch (error) {
      console.log('caught in account action')
      console.log(error)
    }
  };
}


export function editAccountAccountUsersLoading(bool) {
  return {
    type: EDIT_ACCOUNT_ACCOUNT_USERS_LOADING,
    editAccountAccountUsersLoading: bool
  }
}


export function accountsSetAccountUsers(accountId, users) {
  let payload = {accountId, users}
  return {
    type: ACCOUNTS_SET_ACCOUNT_USERS,
    payload,
  };
}


export function fetchAccountUsers(accountId) {
  
  let url = apiBase + `/account/${accountId}/users`;
  return async (dispatch) => {
    dispatch(editAccountAccountUsersLoading(true))
    try {
      
      let result = []
     
      try {

        result = await axios.get(url);

      } catch (error) {
        console.log(error)      
      }
      
      if (result.status === 200) {
        dispatch(accountsSetAccountUsers(accountId, result.data))
        dispatch(editAccountAccountUsersLoading(false))
      }
    } catch (error) {
      alert('Error on fetch users: ' + JSON.stringify(error,null,2))
    }
  };
}
