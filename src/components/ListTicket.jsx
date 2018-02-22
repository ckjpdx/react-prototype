import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import c from './../constants';

function ListTicket(props){
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
      type: c.SELECT_TICKET,
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

  if (props.currentRouterPath === '/admin'){
    return(
      <div onClick={() => {handleSavingSelectedTicket(props.ticketId);}}>
        {ticketInfo}
      </div>
    );
  } else {
    return (
      <div>
        {ticketInfo}
      </div>
    );
  }
}

ListTicket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string,
  currentRouterPath: PropTypes.string,
  ticketId: PropTypes.string.isRequired
};

export default connect()(ListTicket);
