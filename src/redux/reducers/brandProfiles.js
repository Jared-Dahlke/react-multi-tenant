import {BRAND_PROFILES_FETCH_DATA_SUCCESS} from '../action-types/brandProfiles'

export function brandProfiles(state = [], action) {
  switch (action.type) {
  case BRAND_PROFILES_FETCH_DATA_SUCCESS:
    return action.brandProfiles;
  default:
    return state;
  }
}
