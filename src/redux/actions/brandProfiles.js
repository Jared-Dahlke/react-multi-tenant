//import axios from 'axios';
import {BRAND_PROFILES_FETCH_DATA_SUCCESS} from '../action-types/brandProfiles'
//import axios from '../../axiosConfig'
import handleError from '../../errorHandling';
//import config from '../../config.js'
//import {BrandProfile} from '../../models/brandProfile'
//const apiBase = config.apiGateway.URL


let mockBrandProfiles = [
  {brandProfileId: 1, brandProfileName: 'Trendy', website:'www.bruen.com', twitter: 'twitter.com/water', industryVertical: 'Food', industrySubVertical: 'Liquid'},
  {brandProfileId: 2, brandProfileName: 'Conservative', website:'www.pkm.com', twitter: 'twitter.com/you', industryVertical: 'Food', industrySubVertical: 'Liquid'},
  {brandProfileId: 3, brandProfileName: 'Progressive', website:'www.M4A1.com', twitter: 'twitter.com/knowthe', industryVertical: 'Food', industrySubVertical: 'Liquid'},
  {brandProfileId: 4, brandProfileName: 'Emo', website:'www.Origin.com', twitter: 'twitter.com/thing', industryVertical: 'Food', industrySubVertical: 'Liquid'},
]

export function brandProfilesFetchDataSuccess(brandProfiles) {
  return {
    type: BRAND_PROFILES_FETCH_DATA_SUCCESS,
    brandProfiles
  };
}



export function fetchBrandProfiles(accountId) {

  //let url =  apiBase + '/brandProfiles/accountId'
  return async (dispatch) => {
    try {

      //const result = await axios.get(url)       
     
      //if (result.status === 200) {
      //  let brandProfiles = []
      //  for (const brandProfile of result.data) {
          
      //    let newBrandProfile = new BrandProfile(brandProfile.brandProfileId, brandProfile.brandProfileName, brandProfile.website, brandProfile.twitterName, brandProfile.industryVertical, brandProfile.industrySubVertical)
      //    brandProfiles.data.push(newBrandProfile)
      //  }
     
      dispatch(brandProfilesFetchDataSuccess(mockBrandProfiles))
      //}

    }
    catch(error) {    
      let errorType = error.response.status
      handleError(dispatch, errorType)
      //dispatch(usersHasErrored(true))
    }
  };
}


     