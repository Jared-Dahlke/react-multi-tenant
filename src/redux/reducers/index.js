import { ADD_ARTICLE, SET_AUTH_TOKEN } from "../constants/action-types";

const initialState = {
  articles: [],
  authToken: null
}

function rootReducer(state = initialState, action) {
  if(action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    })
  }

  if(action.type === SET_AUTH_TOKEN) {
    return Object.assign({}, state, {
      authToken: action.payload
    })
  }

  return state
}

export default rootReducer;