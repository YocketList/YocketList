import React from 'react';
import ReactDOM from 'react-dom';
import Queue from './queue';
import Form from './queueform';


class QueueApp extends React.Component {
  constructor() {
    super();
    this.state = {
      queues: ['queue1', 'queue2', 'queue3', 'queue4', 'queue5' ]
    }
  } 

  formClick(link) {
    let newQueues = [...this.state.queues];
    newQueues.push(link); 
    this.setState({ queues: newQueues}); //how do you properly change state
  }

  render() {
    var queueComponents = this.state.queues.map(function(queue, ind) {
      return <Queue key={ind} link={queue} />
    });
    return (
    <div>
     <h1>QueueApp</h1>
     {queueComponents}
     <Form key={0} formClick={this.formClick.bind(this)} />
    </div>
    )
  }
}

export default QueueApp;
