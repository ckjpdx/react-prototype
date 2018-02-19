import itemListReducer from './../../src/reducers/item-list-reducer';

describe('itemListReducer', () => {

  test('Should return default state if no action type is recognized', () => {
    expect(itemListReducer({}, {type: null})).toEqual({});
  });

});
