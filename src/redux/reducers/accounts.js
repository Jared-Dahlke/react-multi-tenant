import { ACCOUNTS_FETCH_DATA_SUCCESS, SET_CURRENT_ACCOUNT_ID} from '../action-types/accounts'



export function accounts(state = [], action) {
  switch (action.type) {
  case ACCOUNTS_FETCH_DATA_SUCCESS:
    return action.accounts;
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

