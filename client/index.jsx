import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Desklamp } from 'desklamp';
import Nav from './nav';
// import Layout from './layout';
import HostApp from './hostapp';
import GuestApp from './guestapp';
import CreateEvent from './createevent';
import CreateUser from './createuser';
require("./scss/main.scss");
ReactDOM.render((
  <Container>
    <GuestApp name="guest" />
    <HostApp name='host' />
    <CreateUser />
    <CreateEvent />
  </Container>),
  document.getElementById('App'));

Desklamp.defaultRoute('createuser');

const initState = {
  songs: [{
  href: 'http://youtube.com/?stuff=cool',
  title: 'Neat',
}],
};

const powers = {};
powers.formClick = function(link) {
    // TODO this functionality should be replaced with socket logic.
    // let newQueues = [...Desklamp.getState().songs];
    // newQueues.push(link);
    // Desklamp.updateState({ songs: newQueues});
    console.log('Posting NEW LINK : ', link);
    $.ajax({
      url: HOST+"/queue",
      type:"POST",
      data: JSON.stringify({link: link}),
      contentType:"application/json; charset=utf-8",
      dataType:"json",
    });
};
powers.getData = function() {
    $.get(HOST + "/queue").done((data) => {
        Desklamp.updateState({songs: data});
      });
};


Desklamp.on(initState, powers, Nav);
