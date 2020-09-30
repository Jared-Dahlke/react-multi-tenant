import { ACCOUNTS_FETCH_DATA_SUCCESS, ACCOUNTS_SET_ACCOUNT_USERS, SET_CURRENT_ACCOUNT_ID, SET_IS_SWITCHING_ACCOUNTS, SET_CURRENT_ACCOUNT, TREE_ACCOUNTS_CONVERT_DATA_SUCCESS, EDIT_ACCOUNT_ACCOUNT_USERS_LOADING} from '../action-types/accounts'
import {findAccountNodeByAccountId, markAllAccountsAsCurrentFalse} from '../../utils'


export function accounts(state = [], action) {
  switch (action.type) {
  case ACCOUNTS_FETCH_DATA_SUCCESS:
    return action.accounts;
  case SET_CURRENT_ACCOUNT:
    let newAccounts = JSON.parse(JSON.stringify(state.data))
    markAllAccountsAsCurrentFalse(newAccounts)
    let account = findAccountNodeByAccountId(action.accountId, newAccounts)
    account.current = true
    let accounts = {data: newAccounts}
    return accounts;
  case ACCOUNTS_SET_ACCOUNT_USERS:
      let stateCopy = []
      if(state.data && state.data.length > 0) {
        stateCopy = JSON.parse(JSON.stringify(state.data))
      }  
     // for (const account of stateCopy) {
       let accountNode = findAccountNodeByAccountId(action.payload.accountId,stateCopy)
       accountNode.users = action.payload.users
     // }
      let newAccountState = {data: stateCopy}
      return newAccountState;
  default:
    return state;
  }
}


export function editAccountAccountUsersLoading(state = true, action) {
  switch (action.type) {
  case EDIT_ACCOUNT_ACCOUNT_USERS_LOADING:
    return action.editAccountAccountUsersLoading;
  default:
    return state;
  }
}

export function treeAccounts(state = [], action) {
  switch (action.type) {
  case TREE_ACCOUNTS_CONVERT_DATA_SUCCESS:
    return action.treeAccounts;
  default:
    return state;
  }
}


export function currentAccountId(state = '', action) {
  switch (action.type) {
  case SET_CURRENT_ACCOUNT_ID:
    return action.accountId;
  default:
    return state;
  }
}


export function isSwitchingAccounts(state = false, action) {
  switch (action.type) {
  case SET_IS_SWITCHING_ACCOUNTS:
    return action.isSwitchingAccounts;
  default:
    return state;
  }
}

