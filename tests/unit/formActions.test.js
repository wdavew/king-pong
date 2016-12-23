import * as actions from '../../src/actions/authActions.js'
import * as types from '../../src/constants/ActionTypes'

describe('form actions', () => {
  const text = 'Tywin'
  const creds = { username: text, password: 'Password' };
  const user = { id_token: 'token' };

  it('should create an action to handle text input for username', () => {
    const expectedAction = {
      type: types.UPDATE_NAME_INPUT,
      value: text
    }
    expect(actions.updateNameInput(text)).toEqual(expectedAction)
  })

  it('should create an action to handle text input for password', () => {
    const expectedAction = {
      type: types.UPDATE_PASS_INPUT,
      value: text
    }
    expect(actions.updatePassInput(text)).toEqual(expectedAction)
  })

  it('should create an action to request login information', () => {
    const expectedAction = {
      type: types.LOGIN_REQUEST, isFetching: true, isAuthenticated: false, creds
    }
    expect(actions.requestLogin(creds)).toEqual(expectedAction)
  })

  it('should create an action to for successful login', () => {
    const expectedAction = {
      type: types.LOGIN_SUCCESS, isFetching: false, isAuthenticated: true, token: 'token'
    }
    expect(actions.loginSuccess(user)).toEqual(expectedAction)
  })

  it('should create an error for unsuccessful login', () => {
    const expectedAction = {
      type: types.LOGIN_FAILURE, isFetching: false, isAuthenticated: false, message: 'Login Failure'
    }
    expect(actions.loginError('Login Failure')).toEqual(expectedAction)
  })
  
   it('should create an action to request logout', () => {
    const expectedAction = {
      type: types.LOGOUT_REQUEST, isFetching: true, isAuthenticated: true
    }
    expect(actions.logoutRequest()).toEqual(expectedAction)
  })

  it('should create an action to for successful logout', () => {
    const expectedAction = {
      type: types.LOGOUT_SUCCESS, isFetching: false, isAuthenticated: false
    }
    expect(actions.logoutSuccess()).toEqual(expectedAction)
  })
})
