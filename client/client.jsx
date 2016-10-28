const React = require('react');
const react_dom = require('react-dom');

class Client extends React.Component{
  render(){
    return (
      <div>Hello, Client!</div>
    );
  }
};

react_dom.render(<Client />, document.getElementById('Client'));


