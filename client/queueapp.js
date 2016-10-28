import React from 'react';
import ReactDOM from 'react-dom';

class QueueApp extends React.Component {
  constructor() {
    super();
    this.state = {
      queue: []
    }
  } 

  render() {
    return (
    <div>
     <h1>QueueApp</h1>
    </div>
    )
  }
}

export default QueueApp;