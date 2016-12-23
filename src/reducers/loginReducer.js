import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST,
  LOGOUT_SUCCESS, LOGOUT_FAILURE, UPDATE_NAME_INPUT, UPDATE_PASS_INPUT
} from '../constants/ActionTypes';

const INIT_STATE = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  usernameInput: '',
  passwordInput: '',
}

const filterProps = ({isAuthenticated, isFetching}) => ({ isAuthenticated, isFetching });

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
    case LOGOUT_REQUEST:
      return Object.assign({}, state, filterProps(action))
    case UPDATE_NAME_INPUT:
      return Object.assign({}, state, { usernameInput: action.value });
    case UPDATE_PASS_INPUT:
      return Object.assign({}, state, { passwordInput: action.value });
    default:
      return state;
  }
  return state;
}