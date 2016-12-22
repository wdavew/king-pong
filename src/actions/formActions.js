export const UPDATE_NAME_INPUT = 'UPDATE_NAME_INPUT';
export const UPDATE_PASS_INPUT = 'UPDATE_PASS_INPUT';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const updateNameInput = (val) => (
  {type: UPDATE_NAME_INPUT, value: val}
)

export const updatePassInput = (val) => (
  {type: UPDATE_PASS_INPUT, value: val}
)
export const requestLogin = (creds) => (
  {type: LOGIN_REQUEST, isFetching: true, isAuthenticated: false, creds}
)

export const loginSuccess = (user) => (
  {type: LOGIN_SUCCESS, isFetching: false, isAuthenticated: true, token: user.id_token}
)

export const loginError = (message) => (
  {type: LOGIN_FAILURE, isFetching: false, isAuthenticated: false, message}
)