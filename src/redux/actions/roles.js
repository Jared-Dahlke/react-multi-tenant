//import axios from 'axios';
import {ROLES_HAS_ERRORED, ROLES_IS_LOADING, ROLES_FETCH_DATA_SUCCESS} from '../action-types/roles'
import axios from '../../axiosConfig'
import handleError from '../../errorHandling';

export function rolesHasErrored(bool) {
  return {
    type: ROLES_HAS_ERRORED,
    hasErrored: bool
  };
}
export function rolesIsLoading(bool) {
  return {
    type: ROLES_IS_LOADING,
    isLoading: bool
  };
}
export function rolesFetchDataSuccess(roles) {
  return {
    type: ROLES_FETCH_DATA_SUCCESS,
    roles
  };
}

export function rolesFetchData(url) {
  return async (dispatch) => {

    dispatch(rolesIsLoading(true));
    
    try {
      console.log('axios object from rolesfetchData')
      console.log(axios)

      const result = await axios.get(url)       
      dispatch(rolesIsLoading(false));
      if (result.status === 200) {
        dispatch(rolesFetchDataSuccess(result))
      }

    }
    catch(error) {    
      alert(error)
      let errorType = error.response.status
      handleError(errorType)
      dispatch(rolesHasErrored(true))
    }
  };
}