import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import {setAuthToken} from '../redux/actions/auth.js'

const mapStateToProps = (state) => {
  return { 
    authToken: state.authToken,
    users: state.users 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthToken: (token) => dispatch(setAuthToken(token))
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