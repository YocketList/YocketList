import React from 'react';
import ReactDOM from 'react-dom';

class PlayerApp extends React.Component {
  constructor() {
    super();
    this.state = {
      queue: []
    }
  } 

  render() {
    return (
    <div>
     <h1>PlayerApp</h1>
    </div>
    )
  }
}

export default PlayerApp;