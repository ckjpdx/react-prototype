export default (state = {}, action) => {
  let newState;
  const { names, location, issue, timeOpen, id, formattedWaitTime } = action;

  switch (action.type){
    case 'ADD_TICKET':
    const {names, location, issue, timeOpen, id} = action;
      newState = Object.assign({}, state, {
        [id]: {
          names: names,
          location: location,
          issue: issue,
          timeOpen: timeOpen,
          id: id,
          formattedWaitTime: formattedWaitTime          
        }
    });
    console.log('ADD_TICKET in reducer');
    return newState;

    case 'UPDATE_TIME':
      const newTicket = Object.assign({}, state[id], {formattedWaitTime});
      newState = Object.assign({}, state, {
        [id]: newTicket
      });
      return newState;

  default:
    return state;
  }
};
