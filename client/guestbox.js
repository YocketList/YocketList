import React from 'react';
import Guest from './guest';
const testData = require('../server/model/database')

const GuestBox = (props) => {
  let list;
  if (Array.isArray(props.guests)) {
   list = props.guests.map(function(name, ind) {
      return <Guest key={ind} name={name} />;
    });
  } else {
    list = testData.guestList["5817dafb1da5550f5405937f"].map(function(name, ind) {
       return <Guest key={ind} name={name} />;
     });
  }
  return <div className="GuestBox">
    <h4>Guests</h4>
    {list}
    </div>;
};

export default GuestBox;
