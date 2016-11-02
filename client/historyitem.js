import React from 'react';
// import ReactDOM from 'react-dom';

class HistoryItem extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
    <div className="HistoryItem">
      <span className="HistoryItem-Title">{this.props.data.title}</span>,
      <span className="HistoryItem-AddedBy">added by: {this.props.data.added_by}</span>
      <div className="Action-Fave" onClick={() => this.props.data.Fave(this.props.data.url)} />
    </div>
  )
}
}

export default HistoryItem;
