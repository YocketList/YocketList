const React = require('react');
const react_dom = require('react-dom');


class App extends React.Component{
  render(){
    return (
      <div>Hello, World!</div>
    );
  }
};

react_dom.render(<App/>, document.getElementById('App'));




