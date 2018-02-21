import React from 'react'; // always import core React library
import ListTicket from './ListTicket';
import PropTypes from 'prop-types';

function List(props){
  return (
    <div>
      <hr/>
      {Object.keys(props.ticketList).map((ticketId) => {
        let ticket = props.ticketList[ticketId];
        return <ListTicket
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          formattedWaitTime={ticket.formattedWaitTime}
          currentRouterPath={props.currentRouterPath}
          ticketId={ticketId}
          key={ticketId}
        />;
      })}
    </div>
  );
}

List.propTypes = {
  ticketList: PropTypes.object,
  currentRouterPath: PropTypes.string
};

export default List;
