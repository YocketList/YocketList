const React = require('react');
const react_dom = require('react-dom');

class Player extends React.Component{
  render(){
    return (
      <div>Hello, Player!</div>
    );
  }
};

react_dom.render(<Player/>, document.getElementById('Player'));


