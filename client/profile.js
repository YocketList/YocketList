import React from 'react';
import { Link } from 'react-router';
// import ReactDOM from 'react-dom';

class Profile extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  updateUser() {
    console.log('hi!');
  }
  render() {
  return (
    <div className='Profile-Container'>
    <h1>Howdy There</h1>
    <form name="displayNameUpdate">
      <input type='text' name='username' placeholder={document.cookie['displayname']}></input>
    </form>
    <button onClick={this.updateUser}>Update</button>
  <Link to="home/createEvent">Create New Event</Link>
  </div>
)
}
}

export default Profile;
