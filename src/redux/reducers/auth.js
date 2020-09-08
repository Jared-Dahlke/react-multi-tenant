export function authToken(state = null, action) {
  switch (action.type) {
  case 'SET_AUTH_TOKEN':
    return action.payload;
  default:
    return state;
  }
}

export function isLoggedIn(state = false, action) {
  switch (action.type) {
  case 'SET_LOGGED_IN':
    return action.payload;
  default:
    return state;
  }
}
