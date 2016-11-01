import React from 'react';
import ReactDOM from 'react-dom';
import Song from './song';


const SongList = (props) => {
  console.log(props);
  const list = props.data.songs.map(function(song, ind) {
    return <Song key={ind} link={song} />;
  });
  return <div>{list}</div>;
};

export default SongList;
