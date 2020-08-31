import React, { useState } from 'react';
import {connect} from 'react-redux'
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PrivateRoute from './pages/PrivateRoute.js';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import {Provider} from 'react-redux'
import store from './store/index.js'
import {addArticle, setAuthToken} from './actions/index.js'

//begin dashboard
import Admin from "../src/layouts/Admin.js";
import { createBrowserHistory } from "history";
const hist = createBrowserHistory();



function App(props: any) {

  return (
    <Provider store={store}>
      <Router>
        <div>
         
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </Router>
    </Provider>
  );
}



export default App;
