import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
// import Layout from './layout';
import Profile from './profile';
import HostApp from './hostapp';
import GuestApp from './guestapp';
import CreateEvent from './createevent';
import Home from './home';
require("./scss/main.scss");

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/home" component={Home}>
      {/* make them children of `App` */}
      <Route path="profile" component={Profile}/>
      <Route path="host/:eventId" component={HostApp}/>
      <Route path="guest/:eventId" component={GuestApp}/>
      <Route path="createevent" component={CreateEvent} />
    </Route>
  </Router>,
  document.getElementById('App'))

// Desklamp.defaultRoute('createevent');
