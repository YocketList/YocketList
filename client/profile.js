import React from 'react';
import { Link } from 'react-router';
// import ReactDOM from 'react-dom';
const HOST = require('../app.config').HOST;

class Profile extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  updateUser() {
    console.log('hi!');
  }
  joinRoom() {
    const form = document.forms.joinRoom;
    const newEventObj = {
      google_id: document.cookie['google_id'],
      eventName: form.eventName.value,
      eventType: 'Pool Party',
      eventPassword: form.eventPassword.value,
    };
    console.log('Attempting to Join Event:', newEventObj);
    // this.props.powers.createEvent(newEventObj);
    $.ajax({
          url: HOST+"/joinevent",
          type:"POST",
          data: JSON.stringify(newEventObj),
          contentType:"application/json; charset=utf-8",
          dataType:"json",
        }, (response) => {
          console.log(response);
        this.props.newState(response.body);
        window.location = `/#/home/guest/${response.body.event._id}`;
    });
  }

  render() {
  return (
    <div className='Profile-Container'>
    <h1>Howdy There</h1>
    <form name="displayNameUpdate">
      <input type='text' name='username' placeholder={document.cookie['displayname']}></input>
    </form>
    <button onClick={this.updateUser}>Update Name</button>
    <form name="joinRoom">
      <input type='text' name='eventName' placeholder="Event Name"></input>
      <input type='text' name='eventPassword' placeholder = "Event Password"></input>
    </form>
    <button onClick={this.joinRoom}>Join Room</button>
  <Link to="home/createEvent">Create New Event</Link>
  </div>
)
}
}

export default Profile;
