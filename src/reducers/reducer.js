import leagues from './leagueReducer.js';
import login from './loginReducer.js';

import { combineReducers } from 'redux'

export default combineReducers({
  leagues,
  login,
})