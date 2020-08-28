import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Home from './pages/Home';
import { AuthContext } from "./context/auth.js";
import PrivateRoute from './pages/PrivateRoute.js';
import Login from "./pages/Login";
import Signup from './pages/Signup';


//begin dashboard
import Admin from "../src/layouts/Admin.js";
import { createBrowserHistory } from "history";
const hist = createBrowserHistory();

function App(props: any) {
  const existingTokens  = localStorage.getItem("tokens");
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const setTokens = (data: any) => {
    if (data) {
      localStorage.setItem("tokens", data);
      setAuthTokens(data);
    } else {
      localStorage.removeItem("tokens");
      setAuthTokens("");
    }  
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
         
          <Route exact path="/" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
