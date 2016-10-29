import React from 'react';
import ReactDOM from 'react-dom';
import Queue from './queue';


const QueueList = (props) => {
  const list = props.queues.map(function(queue, ind) {
    return <Queue key={ind} link={queue} />;
  });

  return <div>{list}</div>;
};

export default QueueList;
