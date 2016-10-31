import React from 'react';
import ReactDOM from 'react-dom';
// import Player from './player';
import Youtube from 'react-youtube';
import io from 'socket.io-client';
import QueueList from './queuelist';

const HOST = "http://localhost:3000";

class PlayerApp extends React.Component {
  constructor() {
    super();
    this.state = { 
      urls : []
    };
    this.handlePlayerEnd = this.handlePlayerEnd.bind(this);

    //initiate socket connection and set up listeners
    this.socket = io.connect(HOST);
    console.log(this.socket.id);
    this.initSocket();
  }
  /**
   * This is where the listers for this.socket go.
   * on[newData] -> implies there is a change in data on the backend
   *                the callback will make a GET request and update state
   *                with the new list of Youtube URLs
   */
  initSocket () {
    this.socket.on('newdata', (data) => {
      console.log("got new data");
      $.ajax(HOST + "/queue").done((data) => {
        this.setState({urls: data});
      });
    });
  }
  /**
   * We GET our initial set of data here after the first render
   * has been made.
   */
  componentDidMount(){
    $.get(HOST + "/queue").done((data) => {
      this.setState({urls: data});
    });
  }
  /**
   * handleStateChange is an event listener for the react-youtube
   * componenet's state. The states are as follows:
   * UNSTARTED: -1, ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5
   */
  handleStateChange(event){
    console.log(event.data);
    // CUED was a good option for enabling "auto play" because it waits
    // until the player is loaded (-1) and then the video is cued ready to play
    if(event.data === 5){
      event.target.playVideo();
    }
  }
/**
 * This method makes a post request to the server with the body {method: 'delete'}
 * This removes an item from the db and notifies all clients with the newdata event.
 */
  handlePlayerEnd(event){
    $.ajax({
      type: "POST",
      url: HOST + "/queue",
      data: JSON.stringify({method: "delete"}),
      contentType: "application/json; charset=utf-8",
      });
  }

  render() {
    console.log(this.state.urls);
    // Can we make it so the current video played is not 
    // displayed in the queue?
      if(this.state.urls.length > 0){
        var videoUrl = this.state.urls[0].split('=')[1];
        console.log(videoUrl);
    }
    return (
    <div className="youtube-wrapper">
      <Youtube videoId={videoUrl} onEnd={this.handlePlayerEnd} onStateChange={this.handleStateChange}/>
      <QueueList queues={this.state.urls}/>
    </div>
    );
  }
}

export default PlayerApp;
