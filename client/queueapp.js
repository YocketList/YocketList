import React from 'react';
import ReactDOM from 'react-dom';
import Queue from './queue';
import Form from './queueform';
import QueueList from './queuelist';

class QueueApp extends React.Component {
  constructor() {
    super();
    this.state = {
      queues: []
    }
  } 
  /**
   * We GET our initial set of data here after the first render
   * has been made.
   */
  componentDidMount() {
    $.get("http://localhost:3000/queue").done((data) => {
      console.log('data', data);
      this.setState({queues: data});
    });
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
      url: "http://localhost:3000/queue",
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
