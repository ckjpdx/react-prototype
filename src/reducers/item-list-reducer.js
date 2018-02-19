export default (state = {}, action) => {
  switch (action.type){
    case 'ADD_ITEM':
    const {names, location, issue, timeOpen, id} = action;
    let newState = Object.assign({}, state, {
      [id]: {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id
      }
    });
    return newState;
  default:
    return state;
  }
};
