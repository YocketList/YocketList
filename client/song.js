import React from 'react';
// import ReactDOM from 'react-dom';

class Song extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    this.props.data.upVote = () => {console.log('clicked upvote!');};
    this.props.data.downVote = () => {console.log('clicked downvote!');};
    this.props.data.Fave = () => {console.log('clicked Fave!');};
    return (
      <div>
        {this.props.data.title}, added by: {this.props.data.added_by}
        <img src={`https://i.ytimg.com/vi/${this.props.data.url.split('=')[1]}/hqdefault.jpg`}></img>
        <div className="Action-upVote" onClick={() => this.props.data.upVote(this.props.data.url)} />
        <div className="Action-downVote" onClick={() => this.props.data.downVote(this.props.data.url)} />
        <div className="Action-Fave" onClick={() => this.props.data.Fave(this.props.data.url)} />
      </div>
    )
}
}
export default Song;
