import React from 'react'; // always import core React library
import ListTicket from './ListTicket';
import PropTypes from 'prop-types';

// the component is a function! the name is capitalized and matches the filename
function List(props){
  // the return is JSX that renders content
  // map takes an iterated ticket (object) from an array and corresponding index position
  console.log(props.ticketList);

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
          onTicketSelection={props.onTicketSelection}
          ticketId={ticketId}
          key={ticketId}
        />;
      })}
    </div>
  );
}

List.propTypes = {
  ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func,
  currentRouterPath: PropTypes.string
};

export default List;
