import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
// import Layout from './layout';
import Profile from './profile';
import HostApp from './hostapp';
import GuestApp from './guestapp';
import CreateEvent from './createevent';
import Home from './home';
const HOST = require('../app.config').HOST;
const testData = require('../server/model/database')

class App extends React.Component {
  constructor(props) {
    super(props);
    const ourStuff = testData.queue["5817dafb1da5550f5405937f"];
    this.state = {
      event: testData.event,
      history: ourStuff,
      songs: ourStuff,
      guests: testData.guestList["5817dafb1da5550f5405937f"],
    };
  }
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/home" component={Home}>
          {/* make them children of `App` */}
          <Route path="profile" component={Profile}/>
          <Route path="host/:eventId" state={this.state} component={HostApp}/>
          <Route path="guest/:eventId" state={this.state} getData={this.getData} component={GuestApp}/>
          <Route path="createevent" state={this.state} component={CreateEvent} />
        </Route>
      </Router>)
    }
    getData() {
      $.get(HOST + "/queue").done((data) => {
        this.setState({songs: data});
      });
    }
    newState(newStateObj) {
      this.setState(newStateObj);
    }
}
export default App;
