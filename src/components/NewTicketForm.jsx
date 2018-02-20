import React from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

function NewTicketForm(props){
  let _names = null;
  let _location = null;
  let _issue = null;
  function handleTicketFormSubmission(event){
    const { dispatch } = props;
    event.preventDefault();
    const action = {
      type: 'ADD_TICKET',
      id: v4(),
      names: _names.value,
      location: _location.value,
      issue: _issue.value,
      timeOpen: new Moment()
    };
    dispatch(action);

    _names.value = '';
    _location.value = '';
    _issue.value = '';
  }

  return (
    <div>
      <style jsx>{`
        input, textarea {
          width: 80%;
          display: block;
          margin: 5px auto;
        }
      `}</style>
      <form onSubmit={handleTicketFormSubmission}>
        <input
          type='text'
          id='names'
          placeholder='Pair Names'
          ref={(input) => {_names = input;}} />
        <input
          type='text'
          id='location'
          placeholder='Location'
          ref={(input) => {_location = input;}} />
        <textarea
          id='issue'
          placeholder='Describe your issue.'
          ref={(textarea) => {_issue = textarea;}} />
        <button type='submit'>Help!</button>
      </form>
    </div>
  );
}

export default connect()(NewTicketForm);

// onSubmit events only fire correctly if the form button includes a type='submit' property
