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

  componentDidMount() {
    $.get("http://localhost:3000/queue").done((data) => {
      console.log('data', data);
      this.setState({queues: data});
    });
  }

  formClick(link) {
    let newQueues = [...this.state.queues];
    newQueues.push(link); 
    this.setState({ queues: newQueues}); 
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
