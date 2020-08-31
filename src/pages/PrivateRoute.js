import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
//import { AuthContext, useAuth } from '../context/auth';
//import {useAuth} from '../context/auth.js';
import {connect} from 'react-redux'
import {setAuthToken} from '../actions/index.js'

const mapStateToProps = (state) => {
  return { authToken: state.authToken };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthToken: (token) => dispatch(setAuthToken(token))
  }
}



function isValidToken (token) {
  console.log('checking if isValidToken')
  console.log(token)
  if (token) return true //TODO: send to api to check validity
  return false
}

function PrivateRoute({ component: Component, ...rest }) {
console.log('in private route')

 var authToken = rest.authToken
 console.log('authToken from state:' + authToken)
 if (!authToken) {
  console.log('no authToken from state so getting it from storage')
  authToken = localStorage.getItem("token");
 }

 console.log('final token')
 console.log(authToken)
  
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