import React from 'react';
import Song from './song';
const testData = require('../server/model/database')

const SongList = (props) => {
  let list;
  if (Array.isArray(props.songs)) {
   list = props.songs.map(function(songObj, ind) {
      return <Song key={ind} data={songObj} />;
    });
  } else {
    list = testData.queue["5817dafb1da5550f5405937f"].map(function(songObj, ind) {
       return <Song key={ind} data={songObj} />;
     });
  }
  return (
    <div className="SongList">
      <h4>On Deck:</h4>
      {list}
    </div>
  )
};

export default SongList;
