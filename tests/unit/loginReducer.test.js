import reducer from '../../src/reducers/loginReducer';
import * as types from '../../src/constants/ActionTypes.js';

describe('login reducer', () => {
  const expectedInitialState = {
    isFetching: false,
    isAuthenticated: false,
    usernameInput: '',
    passwordInput: ''
  };
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(expectedInitialState);
  })

  it('should update username', () => {
    const expectedState = Object.assign({}, expectedInitialState, {
      usernameInput: 'Tywin',
    });
    const action = { type: types.UPDATE_NAME_INPUT, value: 'Tywin' }
    expect(reducer(expectedInitialState, action)).toEqual(expectedState);
  })

  it('should update password', () => {
    const expectedState = Object.assign({}, expectedInitialState, {
      passwordInput: 'Password',
    });
    const action = { type: types.UPDATE_PASS_INPUT, value: 'Password' }
    expect(reducer(expectedInitialState, action)).toEqual(expectedState);
  })

  it('should handle login request', () => {
    const expectedState = Object.assign({}, expectedInitialState, {
      isAuthenticated: false,
      isFetching: true,
      user: {}
    });
    const action = {
      type: types.LOGIN_REQUEST,
      isFetching: true,
      isAuthenticated: false,
      creds: {}
    };
    expect(reducer(expectedInitialState, action)).toEqual(expectedState);
  })

  it('should handle login failure', () => {
    const expectedState = Object.assign({}, expectedInitialState, {
      isAuthenticated: false,
      isFetching: false,
      errorMessage: 'Invalid username or password'
    });
    const action = {
      type: types.LOGIN_FAILURE,
      isFetching: false,
      isAuthenticated: false,
      message: 'Invalid username or password'
    };
    expect(reducer(expectedInitialState, action)).toEqual(expectedState);
  })

  it('should handle login success', () => {
    const expectedState = Object.assign({}, expectedInitialState, {
      isAuthenticated: true,
      isFetching: false,
      errorMessage: '',
    });
    const action = {
      type: types.LOGIN_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
    };
    expect(reducer(expectedInitialState, action)).toEqual(expectedState);
  })

  it('should handle logout success', () => {
    const expectedState = Object.assign({}, expectedInitialState, {
      isAuthenticated: false,
      isFetching: false,
    });
    const action = {
      type: types.LOGOUT_SUCCESS,
      isFetching: false,
      isAuthenticated: false,
    };
    expect(reducer(expectedInitialState, action)).toEqual(expectedState);
  })

  it('should handle logout failure', () => {
    const expectedState = Object.assign({}, expectedInitialState, {
      isAuthenticated: true,
      isFetching: false,
    });
    const action = {
      type: types.LOGOUT_SUCCESS,
      isFetching: false,
      isAuthenticated: true,
    };
    expect(reducer(expectedInitialState, action)).toEqual(expectedState);
  })

  it('should handle logout request', () => {
    const expectedState = Object.assign({}, expectedInitialState, {
      isAuthenticated: false,
      isFetching: true,
    });
    const action = {
      type: types.LOGOUT_REQUEST,
      isFetching: true,
      isAuthenticated: false,
    };
    expect(reducer(expectedInitialState, action)).toEqual(expectedState);
  })

})