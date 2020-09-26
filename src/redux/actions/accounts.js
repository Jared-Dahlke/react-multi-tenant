import {
 
  ACCOUNTS_FETCH_DATA_SUCCESS,
  SET_CURRENT_ACCOUNT_ID
  
} from "../action-types/accounts";
import axios from "../../axiosConfig";
import handleError from "../../errorHandling";
import config from "../../config.js";
import {userProfileFetchData} from '../actions/auth'
import {usersFetchData} from '../actions/users'
import {rolesFetchData} from '../actions/roles'
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

export function accountsFetchData() {
  let url = apiBase + "/user/207/accounts";
  return async (dispatch) => {
    try {
      
      const result = await axios.get(url);

      if (result.status === 200) {
        console.log('success')
        let accounts = { data: result.data };
        
        dispatch(accountsFetchDataSuccess(accounts));
        
      }
    } catch (error) {
      alert('Error on fetch accounts: ' +JSON.stringify(error,null,2))
      //let errorType = error.response.status;
      //handleError(dispatch, errorType);
      //dispatch(usersHasErrored(true));
    }
  };
}


export function fetchSiteData(accountId) {
  
  return async (dispatch) => {
    try {

      let userId = localStorage.getItem('userId')

      let accountsUrl = apiBase + `/user/${userId}/accounts`;
      
      const result = await axios.get(accountsUrl);

      let accounts = { data: result.data };

      dispatch(accountsFetchDataSuccess(accounts));

      if(!accountId) {
        let accountIdFromLocalStorage = localStorage.getItem('currentAccountId')
        if(accountIdFromLocalStorage) {
          let userStillHasAccessToThisAccount = false
          for (const account of result.data) {
            if(account.accountId == accountIdFromLocalStorage) {
              userStillHasAccessToThisAccount = true
            }
          }
          if(!userStillHasAccessToThisAccount) {
            accountId = result.data[0].accountId
          } else {
            accountId = accountIdFromLocalStorage
          }
        } else {
          accountId = result.data[0].accountId
        }
        //accountId = result.data[0].accountId
      }

      localStorage.setItem('currentAccountId', accountId)
      
      console.log(accountId)
      dispatch(setCurrentAccountId(accountId))
      dispatch(userProfileFetchData())
      dispatch(usersFetchData(accountId))
      dispatch(rolesFetchData(accountId))

    } catch (error) {
      alert('Error on fetch site data: ' +JSON.stringify(error,null,2))
    }
  };
}

