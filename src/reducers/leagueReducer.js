import * as types from '../constants/ActionTypes.js';

export default (state = { allLeagues: [], activeLeague: '', selectedLeague: '' }, action) => {
  switch (action.type) {
    case types.SET_LEAGUES:
      return Object.assign({}, state, { allLeagues: action.allLeagues });
  }
  return state;
}