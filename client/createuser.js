import React from 'react';

const CreateUser = ({state, powers}) => {
  console.log(state, powers);
    render (
  <div>
    <h1>Howdy There</h1>
    <form action = '/createuser' method="POST">
      <input type='text' name='username' placeholder={document.cookie['displayname']}></input>
      <input type='submit' value="Create"></input>
    </form>
  </div>
)}

export default CreateUser;
