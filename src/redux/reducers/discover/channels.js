import {CATEGORIES_FETCH_DATA_SUCCESS, CHANNELS_FETCH_DATA_SUCCESS} from '../../action-types/discover/channels'

export function categories(state = [], action) {
  switch (action.type) {
  case CATEGORIES_FETCH_DATA_SUCCESS:
    return action.categories;
  default:
    return state;
  }
}


export function channels(state = [], action) {
  switch (action.type) {
  case CHANNELS_FETCH_DATA_SUCCESS:
    //TODO: the getchannels api should accept categories as an input, for now i will filter by categories here
    return action.channels;
  default:
    return state;
  }
}

