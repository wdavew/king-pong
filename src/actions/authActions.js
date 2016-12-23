import * as types from '../constants/ActionTypes.js';

export const updateNameInput = (val) => (
  {type: types.UPDATE_NAME_INPUT, value: val}
)

export const updatePassInput = (val) => (
  {type: types.UPDATE_PASS_INPUT, value: val}
)
export const requestLogin = (creds) => (
  {type: types.LOGIN_REQUEST, isFetching: true, isAuthenticated: false, creds}
)

export const loginSuccess = (user) => (
  {type: types.LOGIN_SUCCESS, isFetching: false, isAuthenticated: true, token: user.id_token}
)
export const loginError = (message) => (
  {type: types.LOGIN_FAILURE, isFetching: false, isAuthenticated: false, message}
)

export const loginUser = (creds) => {
  let init = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }
  
  return (dispatch) => {
    dispatch(requestLogin(creds))
    return fetch('http://localhost:3000/sessions/create', init)
      .then(response => response.json())
      .then(response => {
        return response.ok 
        ? response
        : (dispatch(loginError(response.message)), Promise.reject(response))
      })
      .then(user => dispatch(loginSuccess(user)))
      .then(result => true)
      .catch(err => console.log('error:', err))
  }
} 