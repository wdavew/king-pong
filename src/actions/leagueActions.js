export const fetchLeagues = () => (
  (dispatch) => {
    fetch('/data/getAllLeagues/leagues', { method: 'get' })
      .then(response => response.json())
      .then((jsonLeagueData) => {
        dispatch({ type: 'SET_LEAGUES', allLeagues: jsonLeagueData })
      })
  }
);