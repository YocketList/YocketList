import React from 'react';

const CreateUser = ({ state, powers}) => (
  <div>
    <h1>Howdy There</h1>
    <form action = '/createuser' method="POST">
      <input class='hidden' type='text' name='googleId' readonly></input>
      <input type='text' name='displayName' placeholder={document.cookie['displayname']}></input>
      <input type='submit' value="Create"></input>
    </form>
  </div>
)

export default CreateUser;
