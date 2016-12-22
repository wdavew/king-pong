export default (state = [], action) => {
  switch(action.type) {
    case 'SET_LEAGUES':
      return action.allLeagues;
  }
  return state;
}