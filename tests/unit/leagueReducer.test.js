import reducer from '../../src/reducers/leagueReducer.js';
import * as types from '../../src/constants/ActionTypes.js';

describe('league reducer', () => {
  const state = {
    allLeagues: [],
    selectedLeague: '',
    activeLeague: ''
  }
  it('should return initial state', () => {
    expect(
      reducer(undefined, {})
      ).toEqual({
        allLeagues: [],
        selectedLeague: '',
        activeLeague: ''
      })
  })

  it('should handle SET_LEAGUES', () => {
    expect(
      reducer(state, {type: types.SET_LEAGUES, allLeagues: ['Westeros', 'Essos']})
      ).toEqual({
        allLeagues: ['Westeros', 'Essos'],
        selectedLeague: '',
        activeLeague: ''
      })
  })
})