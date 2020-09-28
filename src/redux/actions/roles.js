//import axios from 'axios';
import {ROLES_HAS_ERRORED, ROLES_PERMISSIONS_HAS_ERRORED, ROLES_IS_LOADING, ROLES_PERMISSIONS_IS_LOADING, ROLES_FETCH_DATA_SUCCESS, ROLES_PERMISSIONS_FETCH_DATA_SUCCESS} from '../action-types/roles'
import axios from '../../axiosConfig'
import handleError from '../../errorHandling';
import config from '../../config'
const apiBase = config.apiGateway.URL;

export function rolesHasErrored(bool) {
  return {
    type: ROLES_HAS_ERRORED,
    hasErrored: bool
  };
}

export function rolesPermissionsHasErrored(bool) {
  return {
    type: ROLES_PERMISSIONS_HAS_ERRORED,
    hasErrored: bool
  };
}
export function rolesIsLoading(bool) {
  return {
    type: ROLES_IS_LOADING,
    isLoading: bool
  };
}

export function rolesPermissionsIsLoading(bool) {
  return {
    type: ROLES_PERMISSIONS_IS_LOADING,
    isLoading: bool
  };
}
export function rolesFetchDataSuccess(roles) {
  return {
    type: ROLES_FETCH_DATA_SUCCESS,
    roles
  };
}

export function rolesPermissionsFetchDataSuccess(rolesPermissions) {
  return {
    type: ROLES_PERMISSIONS_FETCH_DATA_SUCCESS,
    rolesPermissions
  };
}

export function rolesFetchData(accountId) {
  return async (dispatch) => {

    dispatch(rolesIsLoading(true));
    
    try {
      let url =  apiBase + `/account/${accountId}/roles?permissions=false`
      const result = await axios.get(url)       
      dispatch(rolesIsLoading(false));
      if (result.status === 200) {
        dispatch(rolesFetchDataSuccess(result))
      }

    }
    catch(error) {    
      //alert(error)
      let errorType = error.response.status
      handleError(dispatch, errorType)
      dispatch(rolesHasErrored(true))
    }
  };
}


export function rolesPermissionsFetchData(accountId) {
  return async (dispatch) => {

   // dispatch(rolesPermissionsIsLoading(true));

    try {


      let url =  apiBase + `/account/${accountId}/roles?permissions=true`
      const result = await axios.get(url)  
         
      if (result.status === 200) {
        dispatch(rolesPermissionsFetchDataSuccess(result))
        dispatch(rolesPermissionsIsLoading(false));  
      }

    }
    catch(error) {    
      //alert(error)
      let errorType = error.response.status
      handleError(dispatch, errorType)
      dispatch(rolesPermissionsHasErrored(true))
    }
  };
}