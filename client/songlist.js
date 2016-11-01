import React from 'react';
import Song from './song';


const SongList = (props) => {
  console.log(props);
  let list;
  if (Array.isArray(props.songs)) {
   list = props.songs.map(function(songObj, ind) {
      return <Song key={ind} data={songObj} />;
    });
  } else {
    list = [
    <Song key={1} data={{
        title: 'this sucks',
        href: 'http://youtube.com',
    }}/>
    ];
  }
  return <div>{list}</div>;
};

export default SongList;
