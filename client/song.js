import React from 'react';
// import ReactDOM from 'react-dom';

const Song = (props) => {
  props.data.upVote = () => {console.log('clicked upvote!');};
  props.data.downVote = () => {console.log('clicked downvote!');};
  props.data.Fave = () => {console.log('clicked Fave!');};
  return (
    <div>
      {props.data.title}, added by: {props.data.added_by}
      <img src={`https://i.ytimg.com/vi/${props.data.url.split('=')[1]}/hqdefault.jpg`}></img>
      <div className="Action-upVote" onClick={() => props.data.upVote(props.data.url)} />
      <div className="Action-downVote" onClick={() => props.data.downVote(props.data.url)} />
      <div className="Action-Fave" onClick={() => props.data.Fave(props.data.url)} />
    </div>)
}

export default Song;
