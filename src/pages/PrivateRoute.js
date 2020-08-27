import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useAuth} from '../context/auth.js';

function isValidToken (token) {
  if (token) return true
  return false
}

function PrivateRoute({ component: Component, ...rest }) {

  const { authTokens } = useAuth();
  console.log('in private route')
  console.log(authTokens)



  //const validToken = authTokens && authTokens.length > 1 ? true : false
  
  return(
    <Route 
      {...rest} 
      render= { props => 
        isValidToken(authTokens)  ?
      
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

export default PrivateRoute;