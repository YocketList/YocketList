import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   songs: [{
    //   href: 'http://youtube.com/?stuff=cool',
    //   title: 'Neat',
    // }],
    // };
    // this.powers = {};
    // this.powers.createEvent = function(eventObj) {
    //   console.log('Posting Event: ', eventObj);
    //     // TODO this functionality should be replaced with socket logic.
    //     // let newQueues = [...Desklamp.getState().songs];
    //     // newQueues.push(link);
    //     // Desklamp.updateState({ songs: newQueues});
    //     $.ajax({
    //       url: HOST+"/create-event",
    //       type:"POST",
    //       data: JSON.stringify(eventObj),
    //       contentType:"application/json; charset=utf-8",
    //       dataType:"json",
    //     });
    // };
    // this.powers.formClick = function(link) {
    //     // TODO this functionality should be replaced with socket logic.
    //     // let newQueues = [...Desklamp.getState().songs];
    //     // newQueues.push(link);
    //     // Desklamp.updateState({ songs: newQueues});
    //     console.log('Posting NEW LINK : ', link);
    //     $.ajax({
    //       url: HOST+"/queue",
    //       type:"POST",
    //       data: JSON.stringify({link: link}),
    //       contentType:"application/json; charset=utf-8",
    //       dataType:"json",
    //     });
    // };
    // this.powers.getData = function() {
    //     $.get(HOST + "/queue").done((data) => {
    //         this.setState({songs: data});
    //       });
    // };

  }
  render() {
    return (
      <div>
        <h1>YukeToob</h1>
        <ul role="nav">
          <li><Link to="home/profile">Home</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
export default Home;
