//import axios from 'axios';
import {ROLES_HAS_ERRORED, ROLES_PERMISSIONS_HAS_ERRORED, ROLES_IS_LOADING, ROLES_FETCH_DATA_SUCCESS, ROLES_PERMISSIONS_FETCH_DATA_SUCCESS} from '../action-types/roles'
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

<<<<<<< HEAD
export function rolesFetchData(url) {
=======
export function rolesFetchData() {
>>>>>>> origin/sprint-baguio
  return async (dispatch) => {

    dispatch(rolesIsLoading(true));
    
    try {
      let url =  apiBase + '/role'
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


<<<<<<< HEAD
export function rolesPermissionsFetchData(url) {
  return async (dispatch) => {

    try {
=======
export function rolesPermissionsFetchData() {
  return async (dispatch) => {

    try {
      let url =  apiBase + '/permission'
>>>>>>> origin/sprint-baguio
      const result = await axios.get(url)       
      if (result.status === 200) {
        dispatch(rolesPermissionsFetchDataSuccess(result))
      }

    }
    catch(error) {    
      alert(error)
      let errorType = error.response.status
      handleError(errorType)
      dispatch(rolesPermissionsHasErrored(true))
    }
  };
}