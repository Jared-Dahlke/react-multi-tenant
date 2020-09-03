//import axios from 'axios';
import {ITEMS_HAS_ERRORED, ITEMS_IS_LOADING, ITEMS_FETCH_DATA_SUCCESS} from '../action-types/roles'
import axios from '../../axiosConfig'

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

      var result = null;
      try {

        result = await axios.get(url)

        dispatch(itemsIsLoading(false));

        if (result.status === 200) {
          dispatch(itemsFetchDataSuccess(result))
        }
      }
      catch(error) {
        dispatch(itemsHasErrored(true))
      }

  };
}