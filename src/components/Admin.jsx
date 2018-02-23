import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import ListTicketDetail from './ListTicketDetail';
import { connect } from 'react-redux';

function Admin(props){
  console.log(props.currentRouterPath);
  console.log(props.selectedTicket);
  let optionalSelecedTicketContent = null;
  if (props.selectedTicket.length > 0){
    optionalSelecedTicketContent = <ListTicketDetail selectedTicket={props.ticketList[props.selectedTicket]} />;
  }
  return(
    <div>
      <h2>Admin</h2>
      {optionalSelecedTicketContent}
      <List
        ticketList={props.ticketList}
        currentRouterPath={props.currentRouterPath} />
    </div>
  );
}

Admin.propTypes = {
  ticketList: PropTypes.object,
  currentRouterPath: PropTypes.string,
  selectedTicket: PropTypes.object
};

const mapStateToProps = state => {
  return {
    selectedTicket: state.selectedTicket,
    ticketList: state.masterTicketList
  };
};

export default connect(mapStateToProps)(Admin);
