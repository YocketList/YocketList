import { Desklamp, Container } from 'desklamp';
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import HostApp from './hostapp';
import GuestApp from './guestapp';
import CreateEvent from './createevent';
import CreateUser from './createuser';

const initState = {
  songs: ['a song'],
};

const powers = {
  formClick: function(link) {
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
  },
  getData: function() {
    $.get(HOST + "/queue").done((data) => {
        Desklamp.updateState({songs: data});
      });
  },
};

ReactDOM.render(
  <Container>
    <GuestApp name="guest" />
    <HostApp name="host" />
    <CreateEvent />
    <CreateUser />
  </Container>,
  document.getElementById('App'))

Desklamp.on(initState, powers, Nav);
