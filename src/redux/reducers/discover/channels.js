import {CATEGORIES_FETCH_DATA_SUCCESS} from '../../action-types/discover/channels'

export function categories(state = [], action) {
  switch (action.type) {
  case CATEGORIES_FETCH_DATA_SUCCESS:
    return action.categories;
  default:
    return state;
  }
}
