import * as actions from '../../src/actions/authActions.js';
import * as types from '../../src/constants/ActionTypes.js';
import sinon from 'sinon';

describe('login action', () => {
  const expectedLoginAction = {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds: { username: 'John', password: 'John' }
  }
  const expectedSuccessAction = {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: 'token'
  }
  const expectedFailureAction = {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message: 'Incorrect username or password'
  }

  it('should dispatch login success with correct username and password', () => {
    global.fetch = jest.fn(() => new Promise(resolve => resolve({
      id_token: "token",
      ok: true,
      json: function () { return this }
    })));
    const dispatch = sinon.spy();
    return actions.loginUser({ username: 'John', password: 'John' })(dispatch)
      .then(res => {
        expect(dispatch.firstCall.args[0]).toEqual(expectedLoginAction);
        expect(dispatch.secondCall.args[0]).toEqual(expectedSuccessAction);
        expect(dispatch.callCount).toEqual(2);
      })
  })

  it('should dispatch login failure with incorrect username or password', () => {
    global.fetch = jest.fn(() => new Promise(resolve => resolve({
      id_token: "token",
      ok: false,
      message: 'Incorrect username or password',
      json: function () { return this }
    })));
    const dispatch = sinon.spy();
    return actions.loginUser({ username: 'John', password: 'John' })(dispatch)
      .then(res => {
        expect(dispatch.firstCall.args[0]).toEqual(expectedLoginAction);
        expect(dispatch.secondCall.args[0]).toEqual(expectedFailureAction);
        expect(dispatch.callCount).toEqual(2);
      })
  })
})