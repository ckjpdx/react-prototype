import React from 'react'; // always import core React library
import PropTypes from 'prop-types'; // needed where PropTypes are declared - under the function code block
import { connect } from 'react-redux';

function ListTicket(props){ // requires "props" parameter to store incoming properties
  let css = {
    backgroundColor: '#ecf0f1',
    fontFamily: 'sans-serif',
    padding: '20px',
    margin: '5px'
  };
  let cssUl = {
    padding: 15,
    borderRadius: 30,
    backgroundColor: 'honeydew'
  };
  let cssSpan = {
    fontWeight: 900
  };
  function handleSavingSelectedTicket(ticketId){
    const { dispatch } = props;
    const action = {
      type: 'SELECT_TICKET',
      ticketId: ticketId
    };
    dispatch(action);
  }
  const ticketInfo =
    <div style={css}>
      <style jsx>{`
        li{
          background-color: peachpuff;
          list-style: none;
          text-align: left;
        }
    `}</style>
      <h3>ListTicket Content</h3>
      <ul style={cssUl}>
        <li><em>{props.formattedWaitTime}</em></li>
        <li><span style={cssSpan}>Name:</span> {props.names}</li>
        <li><span style={cssSpan}>Location:</span> {props.location}</li>
      </ul>
    </div>;

  // the return is JSX that renders content
  if (props.currentRouterPath === '/admin'){
    return(
      <div onClick={() => {handleSavingSelectedTicket(props.ticketId);}}>
        {ticketInfo}
      </div>
    );
  } else { // YA GOTTA WRAP THE RETURN IN A DIV, YOU JUST GOTTA
    return (
      <div>
        {ticketInfo}
      </div>
    );
  }
}
// import PropTypes at top, then attach propTypes as property to function with an object that has key value pairs for checking types
ListTicket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string,
  currentRouterPath: PropTypes.string,
  ticketId: PropTypes.string.isRequired
};
// formattedWaitTime: PropTypes.string.isRequired,

export default connect()(ListTicket);
