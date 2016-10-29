import React from 'react';
import ReactDOM from 'react-dom';

class QueueForm extends React.Component {
  render() {
    return (
      <div>
        <form name='addLink'>
          <input id='link' type="text" name="link"></input>        
          <button onClick={this.handleClick.bind(this)} onKeyPress={this._handleChange} type="submit" value="Submit">Submit</button>
        </form>
      </div>
    )
  }

  handleClick(e) {
    e.preventDefault();
    const form = document.forms.addLink;
    const link = form.link.value;
    this.props.formClick(link)
    form.link.value = '';
  }

  handlenter() {
    if (e.key === 'Enter') {
      handleClick();
    }
  }
}

export default QueueForm;