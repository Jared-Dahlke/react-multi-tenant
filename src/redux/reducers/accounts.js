import { ACCOUNTS_FETCH_DATA_SUCCESS, SET_CURRENT_ACCOUNT_ID, SET_IS_SWITCHING_ACCOUNTS, SET_CURRENT_ACCOUNT} from '../action-types/accounts'
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
    accounts = {data: newAccounts}
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

