import React from 'react';
// import ReactDOM from 'react-dom';

const HistoryItem = (props) => {
  // this interesting piece of string manipulation takes in a youtube url and turns it into a thumbnail url
  return (
    <div className="HistoryItem">
      <span className="HistoryItem-Title">{props.data.title}</span>,
      <span className="HistoryItem-AddedBy">added by: {props.data.added_by}</span>
      <div className="Action-Fave" onClick={() => props.data.Fave(props.data.url)} />

    </div>)
}

export default HistoryItem;
