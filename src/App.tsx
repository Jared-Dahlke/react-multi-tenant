import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './pages/PrivateRoute.js';
import Login from "./pages/Login";
import Signup from './pages/Signup';
import {Provider} from 'react-redux'
import configureStore from './redux/store/index.js'
import Admin from "../src/layouts/Admin.js";

const store = configureStore();

function App() {

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
