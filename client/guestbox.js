import React from 'react';
import Guest from './guest';
const testData = require('../server/model/database')

class GuestBox extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
  let list;
   list = this.props.guests.map(function(name, ind) {
      return <Guest key={ind} name={name} />;
  });
  return <div className="GuestBox">
    <h4>Guests</h4>
    {list}
    </div>;
}
}
export default GuestBox;
