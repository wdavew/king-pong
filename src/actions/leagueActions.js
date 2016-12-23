import * as types from '../constants/ActionTypes';

export const fetchLeagues = () => (
  (dispatch) => {
    fetch('/data/getAllLeagues/leagues', { method: 'get' })
      .then(response => response.json())
      .then((jsonLeagueData) => {
        dispatch({ type: types.SET_LEAGUES, allLeagues: jsonLeagueData })
      })
  }
);