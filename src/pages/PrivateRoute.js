import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import {setAuthToken, getUserProfileById, setUserId} from '../redux/actions/auth.js'

const mapStateToProps = (state) => {
  return { 
    authToken: state.authToken,
    users: state.users,
    userId : state.userId,
    userProfile: state.authReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthToken: (token) => dispatch(setAuthToken(token)),
    setUserId: (userId) => dispatch(setUserId(userId)),
    getUserProfileById: (userId) => dispatch(getUserProfileById(userId))

  }
}

function isValidToken (token) {
  if (token) return true
  return false
}

function PrivateRoute({ component: Component, ...rest }) {
  var authToken = rest.authToken
  if (!authToken) {
    authToken = localStorage.getItem("token");
    if (authToken) {
      rest.setAuthToken(authToken)
    }
  }

  var userId = rest.userId
  if(!userId){
    let userId = localStorage.getItem("userId")
    if (userId) {
      rest.setUserId(userId)
      rest.getUserProfileById(userId)
    }
  }

  return(
    <Route 
      {...rest} 
      render= { props => 
        isValidToken(authToken)  ?
      
          (
            <Component {...props} />
          )

          :
        

          (         
          
            <Redirect to={{ pathname: '/login', state: {referer: props.location}}}/>      
          )

      }
    />
  );
}

const MyPrivateRoute = connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)

export default MyPrivateRoute;