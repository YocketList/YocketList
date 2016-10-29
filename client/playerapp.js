import React from 'react';
import ReactDOM from 'react-dom';
// import Player from './player';
import Youtube from 'react-youtube';
import io from 'socket.io-client';
import QueueList from './queuelist';

class PlayerApp extends React.Component {
  constructor() {
    super();
    this.state = { 
      urls : []
    };
    this.handlePlayerEnd = this.handlePlayerEnd.bind(this);
    this.socket = io.connect('http://localhost:3000');
    this.initSocket();
  }
  initSocket () {
    this.socket.on('newdata', (data) => {
      console.log("got new data");
      $.ajax("http://localhost:3000/queue").done((data) => {
        this.setState({urls: data});
      });
    });
  }
  componentDidMount(){
    $.get("http://localhost:3000/queue").done((data) => {
      this.setState({urls: data});
    });

  }
  handleStateChange(event){
    if(event.data === 5){
      event.target.playVideo();
    }
  }

  handlePlayerEnd(event){
    // swap out video for Youtube Player
    // Make request to server to notify all clients that the video ended
    //  so they can remove the video from the queue 
    //  another get request or just remove top item
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/queue",
      data: JSON.stringify({method: "delete"}),
      success: playerEndDone,
      contentType: "application/json; charset=utf-8",
      });
  }

  render() {
    // Can we make it so the current video played is not 
    // displayed in the queue?
    if(this.state.urls.length > 1)
    var videoUrl = this.state.urls[0].split('=')[1];
    return (
    <div className="youtube-wrapper">
      <Youtube videoId={videoUrl} onEnd={this.handlePlayerEnd} onStateChange={this.handleStateChange}/>
      <QueueList queues={this.state.urls}/>
    </div>
    );
  }
}

export default PlayerApp;
