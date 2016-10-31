import React from 'react';
import ReactDOM from 'react-dom';
import Queue from './queue';
import Form from './queueform';
import QueueList from './queuelist';
import io from 'socket.io-client';

const HOST = "http://localhost:3000";

class QueueApp extends React.Component {
  constructor() {
    super();
    this.state = {
      queues: []
    }

    this.socket = io.connect(HOST);
    this.initializeListeners();
  } 
  /**
   * We GET our initial set of data here after the first render
   * has been made.
   */

  getData() {
    $.get(HOST + "/queue").done((data) => {
        this.setState({queues: data});
      });
  }

  initializeListeners() {
    this.socket.on('newdata', () => {
      this.getData();
    });
  }
  
  componentDidMount() {
    this.getData();
  }

  /**
   * This is the callback for the form component to use in onClick.
   * It makes an ajax request to add a new link when the submit button is clicked.
   */
  formClick(link) {
    // TODO this functionality should be replaced with socket logic.
    let newQueues = [...this.state.queues];
    newQueues.push(link); 
    this.setState({ queues: newQueues});
    $.ajax({
      url: HOST+"/queue",
      type:"POST",
      data: JSON.stringify({link: link}),
      contentType:"application/json; charset=utf-8",
      dataType:"json",
    });
  }

  render() {
    return (
      <div>
        <h1>QueueApp</h1>
        <QueueList queues={this.state.queues} />
        <Form key={0} formClick={this.formClick.bind(this)} />
      </div>
    )
  }
}

export default QueueApp;
