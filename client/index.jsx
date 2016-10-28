import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Layout from './layout';
import PlayerApp from './playerapp';
import QueueApp from './queueapp';


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      {/* make them children of `App` */}
      <Route path="player" component={PlayerApp}/>
      <Route path="queue" component={QueueApp}/>
    </Route>
  </Router>,
  document.getElementById('App'))




