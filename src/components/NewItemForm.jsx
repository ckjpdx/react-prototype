import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

function NewItemForm(props){
  console.log(props);
  let _names = null;
  let _location = null;
  let _issue = null;
  function handleItemFormSubmission(event){
    event.preventDefault();
    props.onNewItemCreation({
      names: _names.value,
      location: _location.value,
      issue: _issue.value,
      timeOpen: new Moment()
    });
    _names.value = '';
    _location.value = '';
    _issue.value = '';
  }

  NewItemForm.propTypes = {
    onNewItemCreation: PropTypes.func
  };

  return (
    <div>
      <style jsx>{`
        input, textarea {
          width: 80%;
          display: block;
          margin: 5px auto;
        }
      `}</style>
      <form onSubmit={handleItemFormSubmission}>
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

export default NewItemForm;

// onSubmit events only fire correctly if the form button includes a type='submit' property
