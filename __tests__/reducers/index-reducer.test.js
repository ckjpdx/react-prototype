import rootReducer from './../../src/reducers/index';
import selectedTicketReducer from './../../src/reducers/selected-ticket-reducer';
import ticketListReducer from './../../src/reducers/ticket-list-reducer';
import { createStore } from 'redux';
import Moment from 'moment';

let store = createStore(rootReducer);

describe("rootReducer", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({});
  });

  test('Should contain ticketListReducer logic', () => {
    expect(store.getState().masterTicketList).toEqual(ticketListReducer(undefined, { type: null }));
  });

  test('Should contain selectedTicketReducer logic', () => {
    expect(store.getState().selectedTicket).toEqual(selectedTicketReducer(undefined, { type: null }));
  });
  
  test('New ticket should include Moment-formatted wait times', () => {
    const { names, location, issue, timeOpen, id } = sampleTicketData;
    action = {
      type: 'ADD_TICKET',
      names: names,
      location: location,
      issue: issue,
      timeOpen: timeOpen,
      id: id,
      formattedWaitTime: new Moment().fromNow(true)
    };
    expect(ticketListReducer({}, action)).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: 'a few seconds'
      }
    });
  });

});
