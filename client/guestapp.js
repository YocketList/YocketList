import React from 'react';
import ReactDOM from 'react-dom';
import Song from './song';
import Form from './queueform';
import SongList from './songlist';
import io from 'socket.io-client';

const HOST = "http://localhost:3000";

class GuestApp extends React.Component {
  constructor(props) {
    super(props);
  }
  /**
   * We GET our initial set of data here after the first render
   * has been made.
   */
  componentDidMount() {
    this.socket = io.connect(HOST);
    // Initialize Listener
    this.socket.on('newdata', () => {
      this.props.powers.getData();
    });
    // redundant? Maybe just issue a newdata event on connect?
    this.props.powers.getData();
  }

  /**
   * This is the callback for the form component to use in onClick.
   * It makes an ajax request to add a new link when the submit button is clicked.
   */

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>GuestApp</h1>
        <SongList songs={this.props.state.songs} />
        <Form key={0} formClick={this.props.powers.formClick} />
      </div>
    )
  }
}

export default GuestApp;
