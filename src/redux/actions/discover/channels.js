//GET /discover/categories
//GET /discover/channels
//GET/discover/videos
import axios from "../../../axiosConfig";
import config from "../../../config.js";
import {CATEGORIES_FETCH_DATA_SUCCESS} from '../../action-types/discover/channels'

const apiBase = config.apiGateway.URL;

export function fetchCategories() {
  console.log('fetch categories')
  let url =  apiBase + `/discover/categories`
  return async (dispatch) => {
    try {

      const result = await axios.get(url)       
     
      if (result.status === 200) {
        //let brandProfiles = result.data    
        dispatch(categoriesFetchDataSuccess(result.data))
        //dispatch(brandProfilesIsLoading(false))
      }
     // dispatch(categoriesIsLoading(false))

    }
    catch(error) {    
     alert(error)
     console.log(error)
    }
  };
}


export function categoriesFetchDataSuccess(categories) {
  return {
    type: CATEGORIES_FETCH_DATA_SUCCESS,
    categories,
  };
}



export function fetchChannels() {
  
  let url =  apiBase + `/discover/channels`
  return async (dispatch) => {
    try {

      const result = await axios.get(url)       
     
      if (result.status === 200) {
       console.log(result)
      }
     
    }
    catch(error) {    
     alert(error)
     console.log(error)
    }
  };
}


export function fetchVideos() {
  
  let url =  apiBase + `/discover/videos`
  return async (dispatch) => {
    try {

      const result = await axios.get(url)       
     
      if (result.status === 200) {
        console.log(result)
      }
     
    }
    catch(error) {    
     alert(error)
     console.log(error)
    }
  };
}