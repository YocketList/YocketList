import React from 'react';
import ReactDOM from 'react-dom';

const Queue = (props) => {
  // this interesting piece of string manipulation takes in a youtube url and turns it into a thumbnail url
  return <div><img src={`https://i.ytimg.com/vi/${props.link.split('=')[1]}/hqdefault.jpg`}></img></div>;
}

export default Queue;
