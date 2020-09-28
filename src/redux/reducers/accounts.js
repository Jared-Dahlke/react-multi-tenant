import { ACCOUNTS_FETCH_DATA_SUCCESS, SET_CURRENT_ACCOUNT_ID, SET_IS_SWITCHING_ACCOUNTS, SET_CURRENT_ACCOUNT} from '../action-types/accounts'
import {findAccountNodeByAccountId, markAllAccountsAsCurrentFalse} from '../../utils'


export function accounts(state = [], action) {
  switch (action.type) {
  case ACCOUNTS_FETCH_DATA_SUCCESS:
    return action.accounts;
  case SET_CURRENT_ACCOUNT:
    console.log('inside set current account')
    let newAccounts = JSON.parse(JSON.stringify(state.data))
    markAllAccountsAsCurrentFalse(newAccounts)
    let account = findAccountNodeByAccountId(action.accountId, newAccounts)
    console.log('account found from find account node by account')
    console.log(account)
    account.current = true
    accounts = {data: newAccounts}
    console.log('about to return from set current account in reducer:')
    console.log(accounts)
    return accounts;
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

