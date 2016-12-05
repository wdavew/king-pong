export default function reducer(state = {}, action) {
  console.log(action);
  switch(action.type) {
    case 'SET_LEAGUES':
      return Object.assign({}, state, {allLeagues : action.allLeagues});
  }
  return state;
}