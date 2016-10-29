import React from 'react';
import ReactDOM from 'react-dom';
// import Player from './player';
import Youtube from 'react-youtube';

class PlayerApp extends React.Component {
  constructor() {
    super();
    this.state = { 
      urls : ['']
    };
    this.handlePlayerEnd = this.handlePlayerEnd.bind(this);
    this.player;
  }
  componentDidMount(){
    // make ajax request to get the queue list here
    $.ajax("localhost:3000/queue").done((data) => {
      console.log(data);
    });
  }
  handlePlayerEnd(event){
    // console.log('event.data');
    // swap out video for Youtube Player
    // Make request to server to notify all clients that the video ended
    //  so they can remove the video from the queue 
    //  another get request or just remove top item
  }
  render() {
    // Can we make it so the current video played is not 
    // displayed in the queue?
    let videoUrl = this.state.urls[0];
    return (
    <div className="youtube-wrapper">
      <Youtube videoId={videoUrl} onEnd={()=>{this.handlePlayerEnd}}/>
    </div>
    );
  }
}

export default PlayerApp;