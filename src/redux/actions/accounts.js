import {
 
  ACCOUNTS_FETCH_DATA_SUCCESS
  
} from "../action-types/accounts";
import axios from "../../axiosConfig";
import handleError from "../../errorHandling";
import config from "../../config.js";
//import { Account } from "../../models/user";


const apiBase = config.apiGateway.URL;


export function accountsFetchDataSuccess(accounts) {
  return {
    type: ACCOUNTS_FETCH_DATA_SUCCESS,
    accounts,
  };
}

export function accountsFetchData() {
  let url = apiBase + "/account";
  return async (dispatch) => {
    try {
      
      const result = await axios.get(url);

      if (result.status === 200) {
        console.log('success')
        /*let accounts = { data: [] };
        for (const account of result.data) {       
          let newAccount = new Account(
            account.userId,
            account.firstName,
            account.lastName,
            account.company,

            let users
            account.email,
            account.userType
          );
          users.data.push(newUser);
        }
        dispatch(usersFetchDataSuccess(users));
        */
      }
    } catch (error) {
      let errorType = error.response.status;
      handleError(dispatch, errorType);
      //dispatch(usersHasErrored(true));
    }
  };
}

