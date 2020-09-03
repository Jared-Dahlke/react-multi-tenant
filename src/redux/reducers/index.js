
import {combineReducers} from 'redux'
import {items, itemsHasErrored, itemsIsLoading} from './roles'
import {authToken} from './auth'


export default combineReducers({
  authToken,
  items,
  itemsHasErrored,
  itemsIsLoading
})