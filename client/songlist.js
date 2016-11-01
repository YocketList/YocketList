import React from 'react';
import Song from './song';

class SongList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
  let list;
  console.log(this.props.songs);
   list = this.props.songs.map(function(songObj, ind) {
      return <Song key={ind} data={songObj} />;
    });
  console.log(list);
  return (
    <div className="SongList">
      <h4>On Deck:</h4>
      {list}
    </div>
  )
}
}

export default SongList;
