//import axios from 'axios';
import {BRAND_PROFILES_FETCH_DATA_SUCCESS} from '../action-types/brandProfiles'
import axios from '../../axiosConfig'
import handleError from '../../errorHandling';
import config from '../../config.js'
import {BrandProfile} from '../../models/brandProfile'
const apiBase = config.apiGateway.URL


///let mockBrandProfiles = [
//  {}
//]

export function brandProfilesFetchDataSuccess(brandProfiles) {
  return {
    type: BRAND_PROFILES_FETCH_DATA_SUCCESS,
    brandProfiles
  };
}


export function fetchBrandProfiles() {

  let url =  apiBase + '/brandProfiles'
  return async (dispatch) => {
    try {

      const result = await axios.get(url)       
     
      if (result.status === 200) {
        let brandProfiles = []
        for (const brandProfile of result.data) {
          
          let newBrandProfile = new BrandProfile(brandProfile.brandProfileId, brandProfile.brandProfileName, brandProfile.website, brandProfile.twitterName, brandProfile.industryVertical, brandProfile.industrySubVertical)
          brandProfiles.data.push(newBrandProfile)
        }
        dispatch(brandProfilesFetchDataSuccess(brandProfiles))
      }

    }
    catch(error) {    
      let errorType = error.response.status
      handleError(dispatch, errorType)
      //dispatch(usersHasErrored(true))
    }
  };
}


     