import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Desklamp } from 'desklamp';
import Layout from './layout';
import HostApp from './hostapp';
import GuestApp from './guestapp';
import CreateEvent from './createevent';
import CreateUser from './createuser';
import Nav from './nav';

ReactDOM.render((
  <Container>
    <GuestApp name="guest" />
    <HostApp name='host' />
    <CreateUser />
    <CreateEvent />
  </Container>),
  document.getElementById('App'));

console.log('desklamp2:', Desklamp.defaultRoute);

// Desklamp.defaultRoute('createuser');

const initState = {
  songs: ['a song'],
};

const powers = {};
powers.formClick = function(link) {
    // TODO this functionality should be replaced with socket logic.
    let newQueues = [...Desklamp.getState().songs];
    newQueues.push(link);
    Desklamp.updateState({ songs: newQueues});
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
