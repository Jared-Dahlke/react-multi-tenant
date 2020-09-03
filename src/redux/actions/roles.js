import axios from 'axios';

export function itemsHasErrored(bool) {
  return {
      type: 'ITEMS_HAS_ERRORED',
      hasErrored: bool
  };
}
export function itemsIsLoading(bool) {
  return {
      type: 'ITEMS_IS_LOADING',
      isLoading: bool
  };
}
export function itemsFetchDataSuccess(items) {
  return {
      type: 'ITEMS_FETCH_DATA_SUCCESS',
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

        console.log('fetch role status:' + result.status)
        if (result.status === 200) {

          console.log('fetch roles success:' + JSON.stringify(result))
          dispatch(itemsFetchDataSuccess(result))
        }
      }
      catch(error) {
        console.log('fetch errored: '+ error)
        dispatch(itemsHasErrored(true))
      }

  };
}