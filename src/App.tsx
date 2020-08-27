import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Home from './pages/Home'
import Admin from './pages/Admin';
import { AuthContext } from "./context/auth.js";
import PrivateRoute from './pages/PrivateRoute.js';
import Login from "./pages/Login";
import Signup from './pages/Signup';

function App(props: any) {

  const existingTokens = JSON.parse(localStorage.getItem("tokens") || '{}');
  console.log('got tokens:')
  console.log(existingTokens)
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data: any) => {
    console.log('setting tokens:')
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
         
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
