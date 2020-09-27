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

export function accountsFetchData() {
  let url = apiBase + "/user/207/accounts";
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
      
      let result = []
     // try {
        result = await axios.get(accountsUrl);
       // console.log('made it here')
     // } catch (error) {
       // console.log(result)
       // if(result.status == 401) {
       //   handleError(dispatch, result.status);
       // }
     // }
      console.log('made it here')
      
      let accounts = { data: result.data };
      console.log(accounts.data)

      dispatch(accountsFetchDataSuccess(accounts));

      if(!accountId) {
        console.log('no account id')
        let accountIdFromLocalStorage = localStorage.getItem('currentAccountId')
        console.log(accountIdFromLocalStorage)
        if(accountIdFromLocalStorage) {
          let userStillHasAccessToThisAccount = false

          let node = findAccountNodeByAccountId(accountIdFromLocalStorage, result.data)
          console.log('node:' + JSON.stringify(node))
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
        //accountId = result.data[0].accountId
      }

      localStorage.setItem('currentAccountId', accountId)
      dispatch(setCurrentAccountId(accountId))
      dispatch(userProfileFetchData())
      dispatch(usersFetchData(accountId))
      dispatch(rolesFetchData(accountId))

    } catch (error) {
      console.log('caught in account action')
      console.log(error)
      //alert('Error on fetch site data: ' +JSON.stringify(error,null,2))
    }
  };
}

