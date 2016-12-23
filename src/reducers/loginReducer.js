import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../constants/ActionTypes';

const INIT_STATE = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
}

const filterProps = ({isAuthenticated, isFetching}) => ({ isFetching, isFetching });

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, filterProps(action), { user: action.creds })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, filterProps(action), { errorMessage: '' })
    case LOGIN_FAILURE:
      return Object.assign({}, state, filterProps(action), { errorMessage: action.message })
    case LOGOUT_SUCCESS:
    case LOGOUT_FAILURE:
      return Object.assign({}, state, filterProps(action))
    default:
      return state;
  }
}