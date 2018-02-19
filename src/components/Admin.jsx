import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import ListTicketDetail from './ListTicketDetail';

function Admin(props){
  console.log(props.currentRouterPath);
  let optionalSelecedTicketContent = null;
  if (props.selectedTicket != null){
    optionalSelecedTicketContent = <ListTicketDetail selectedTicket={props.ticketList[props.selectedTicket]} />;
  }
  return(
    <div>
      <h2>Admin</h2>
      {optionalSelecedTicketContent}
      <List
        ticketList={props.ticketList}
        currentRouterPath={props.currentRouterPath}
        onTicketSelection={props.onTicketSelection}
      />
    </div>
  );
}

Admin.propTypes = {
  ticketList: PropTypes.array,
  currentRouterPath: PropTypes.string,
  onTicketSelection: PropTypes.func.isRequired,
  selectedTicket: PropTypes.string
};

export default Admin;
