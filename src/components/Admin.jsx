import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import ListTicketDetail from './ListTicketDetail';
import { connect } from 'react-redux';

function Admin(props){
  console.log(props.currentRouterPath);
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

const mapStateToProps = state => {
  return {
    selectedTicket: state.selectedTicket,
    ticketList: state.masterTicketList
  };
};

Admin.propTypes = {
  ticketList: PropTypes.array,
  currentRouterPath: PropTypes.string,
  selectedTicket: PropTypes.string
};

export default connect()(Admin);
