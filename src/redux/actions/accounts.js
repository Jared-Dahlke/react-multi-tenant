import {
 
  ACCOUNTS_FETCH_DATA_SUCCESS,
  SET_CURRENT_ACCOUNT_ID,
  SET_CURRENT_ACCOUNT
  
} from "../action-types/accounts";
import axios from "../../axiosConfig";
import handleError from "../../errorHandling";
import config from "../../config.js";
import {userProfileFetchData} from '../actions/auth'
import {usersFetchData, usersFetchDataSuccess} from '../actions/users'
import {rolesFetchData, rolesFetchDataSuccess, rolesPermissionsFetchData, rolesPermissionsFetchDataSuccess} from '../actions/roles'
import {brandProfilesFetchDataSuccess, fetchBrandProfiles} from '../actions/brandProfiles'
import {findAccountNodeByAccountId} from '../../utils'
//import { Account } from "../../models/user";


const apiBase = config.apiGateway.URL;


export function accountsFetchDataSuccess(accounts) {
  return {
    type: ACCOUNTS_FETCH_DATA_SUCCESS,
    accounts,
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

export function accountsFetchData(userId) {
  let url = apiBase + `/user/${userId}/accounts`;
  return async (dispatch) => {
    try {
      
      let result = []
      try {
        result = await axios.get(url);
      } catch (error) {
        console.log('error fetching accounts')
        if(result.status === 401) {
          handleError(dispatch, result.status);
        }
      }

      if (result.status === 200) {
        let accounts = { data: result.data };
        
        dispatch(accountsFetchDataSuccess(accounts));
        
      }
    } catch (error) {
      alert('Error on fetch accounts: ' +JSON.stringify(error,null,2))

    }
  };
}



export function clearSiteData() {
  return (dispatch) => {

    dispatch(accountsFetchDataSuccess([]));
    dispatch(setCurrentAccountId(null))
    dispatch(usersFetchDataSuccess([]))
    dispatch(rolesFetchDataSuccess([]))
    dispatch(rolesPermissionsFetchDataSuccess([]))
    dispatch(brandProfilesFetchDataSuccess([]))

  }
  
}


export function fetchSiteData(accountId) {
  
  return async (dispatch) => {
      try {

      let userId = localStorage.getItem('userId')

      let accountsUrl = apiBase + `/user/${userId}/accounts`;
      
      let result = await axios.get(accountsUrl);
      let accounts = { data: result.data };

      dispatch(accountsFetchDataSuccess(accounts));

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

