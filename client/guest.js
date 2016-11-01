import React from 'react';
// import ReactDOM from 'react-dom';

const Guest = (props) => {
  // this interesting piece of string manipulation takes in a youtube url and turns it into a thumbnail url
  return <div className='GuestBox-GuestName'>
    {props.name}
    </div>;
}

export default Guest;
