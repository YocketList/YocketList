import React from 'react';

const CreateEvent = ({ state, powers}) => (
    <div>
      <h1>Having a Party, eh?</h1>
      <form action = '/createevent' method="POST">
        <input class='hidden' type='text' name='googleId' readonly value={document.cookie['googleId']}></input>
        Event Name: <input type='text' name='eventName' placeholder='Orangutan Jam'></input>
        Event Password: <input type='text' name='eventPass' placeholder='CrazyApes'></input>
      Fave Matchmaking Enabled: <input type='checkbox' name='matchMakingEnabled'></input>
        <input type='submit' value="Create"></input>
      </form>
    </div>
  )

export default CreateEvent;
