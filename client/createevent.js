import React from 'react';
const HOST = require('../app.config').HOST;

class CreateEvent extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
    <div>
      <h1>Having a Party, eh?</h1>
      <form name="newParty">
        <input className='hiddenish' type='text' name='googleId' readOnly value={document.cookie['googleId']}></input>
        Event Name: <input type='text' name='eventName' placeholder='Orangutan Jam'></input>
        Event Password: <input type='text' name='eventPass' placeholder='CrazyApes'></input>
      Fave Matchmaking Enabled: <input type='checkbox' name='matchMakingEnabled'></input>
      </form>
      <button onClick={this.handleClick}>Create</button>
    </div>
  )
}
handleClick(e) {
  // e.preventDefault();
  const form = document.forms.newParty;
  const newEventObj = {
    google_id: document.cookie['google_id'],
    eventName: form.eventName.value,
    eventType: 'Pool Party',
    eventPassword: form.eventPass.value,
  };
  console.log('Posting New Event:', newEventObj);
  newEventObj.matchmaking = form.matchMakingEnabled.value === 'on' ? true : false;
  // this.props.powers.createEvent(newEventObj);
  $.ajax({
        url: HOST+"/create-event",
        type:"POST",
        data: JSON.stringify(newEventObj),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
      }, (response) => {
        this.props.newState(response);
      window.location = `/#/home/host/${response.event._id}`;
    });
}
}
export default CreateEvent;
