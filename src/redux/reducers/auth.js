export function authToken(state = null, action) {
  console.log('!! inside setAuthToken reducer')
  console.log(action)
  switch (action.type) {
      case 'SET_AUTH_TOKEN':
          return action.payload;
      default:
          return state;
  }
}

/* if(action.type === SET_AUTH_TOKEN) {
  return Object.assign({}, state, {
    authToken: action.payload
  })
} */
