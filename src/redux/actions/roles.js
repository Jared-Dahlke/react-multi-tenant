//import axios from 'axios';
import {ITEMS_HAS_ERRORED, ITEMS_IS_LOADING, ITEMS_FETCH_DATA_SUCCESS} from '../action-types/roles'
import axios from '../../axiosConfig'
import handleError from '../../errorHandling';

export function itemsHasErrored(bool) {
  return {
      type: ITEMS_HAS_ERRORED,
      hasErrored: bool
  };
}
export function itemsIsLoading(bool) {
  return {
      type: ITEMS_IS_LOADING,
      isLoading: bool
  };
}
export function itemsFetchDataSuccess(items) {
  return {
      type: ITEMS_FETCH_DATA_SUCCESS,
      items
  };
}

export function itemsFetchData(url) {
  return async (dispatch) => {

      dispatch(itemsIsLoading(true));
      
      try {

        const result = await axios.get(url)       
        dispatch(itemsIsLoading(false));
        if (result.status === 200) {
          dispatch(itemsFetchDataSuccess(result))
        }

      }
      catch(error) {
        console.log('error from role fetch')
        console.log(error)
        let errorType = error.response.status
        handleError(errorType)
        dispatch(itemsHasErrored(true))
      }
  };
}