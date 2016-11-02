import React from 'react';
// import ReactDOM from 'react-dom';
// import Song from './song';
import Form from './queueform';
import SongList from './songlist';
import HistoryList from './historylist';
import GuestBox from'./guestbox';
import io from 'socket.io-client';
const testData = require('../server/model/database')

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
    this.socket.on('event', () => {
      this.props.getData();
    });
    // redundant? Maybe just issue a newdata event on connect?
    this.props.getData();
  }

  formClick(link) {
      console.log('Posting NEW LINK : ', link);
      $.ajax({
        url: HOST+"/queue/"+ this.props.params.eventId,
        type:"POST",
        data: JSON.stringify({link: link}),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
      });

  };
  /**
   * This is the callback for the form component to use in onClick.
   * It makes an ajax request to add a new link when the submit button is clicked.
   */

  render() {
    return (
      <div>
        <h1>Event: {this.props.params.eventId}</h1>
        <GuestBox guests={this.state.guests}/>
        <div className="SongList-Form-container">
          <SongList songs={this.state.songs} />
          <Form key={0} formClick={this.formClick.bind(this)} />
        </div>
        <HistoryList history={this.state.history} />
      </div>
    )
  }
}

export default GuestApp;
