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

  /**
   * event handler the form submission. This will use the formClick callback
   * to make the ajax request and clear the form.
   * preventDefault is used to prevent a page refresh.
   */
  handleClick(e) {
    e.preventDefault();
    const form = document.forms.addLink;
    const link = form.link.value;
    this.props.formClick(link)
    form.link.value = '';
  }

  /**
   * event handler for form sumission. It intercepts key presses to enter to allow
   * the user to submit using the enter button.
   */
  handlenter(e) {
    if (e.key === 'Enter') {
      handleClick(e);
    }
  }
}

export default QueueForm;