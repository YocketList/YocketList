import React from 'react';
import ReactDOM from 'react-dom';

const Queue = (props) => {
  return <div><img src={`https://i.ytimg.com/vi/${props.link.split('=')[1]}/hqdefault.jpg`}></img></div>;
}

export default Queue;
