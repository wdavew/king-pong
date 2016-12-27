import {
  findUser,
  findUsersOfLeague,
  findUserLeagues,
  getNewElo,
  createNewUser,
  joinLeague,
  authenticateUser
} from '../../src/server/controllers/userController';

let request = require('supertest');
request = request('http://localhost:3000');

describe('authenticateUser', () => {
  it('should send 401 if username not found', () => {
    return request
      .post('/sessions/create')
      .send({ username: 'Fake', password: 'Fake' })
      .expect(401)
  });
  it('should send 401 if username is found but password does not match', () => {
    return request
      .post('/sessions/create')
      .send({ username: 'Tywin_Lannister', password: 'Fake' })
      .expect(401)
  });
  it('should send 200 if username is found with matching password', () => {
    return request
      .post('/sessions/create')
      .send({ username: 'Tywin_Lannister', password: 'cat' })
      .expect(200)
  });
})

describe('findUser', () => {
  it('should send 200 if user is found', () => {
    return request
      .get('/data/userInfo')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.VHl3aW5fTGFubmlzdGVy.Nvnz-KU18HUCHhQnWDJZB8ajtI2qF9Qm_wvnGLf_m_w')
      .expect(200);
  })
  it('should send 401 if unauthorized', () => {
    return request
      .get('/data/userInfo')
      .set('x-access-token', 'fakeToken')
      .expect(401);
  })
  it('should send 401 if no token is provided', () => {
    return request
      .get('/data/userInfo')
      .expect(401);
  })

  describe('findUsersOfLeague', () => {
    it('should send 401 if unauthorized', () => {
      return request
        .get('/data/league/Westeros')
        .set('x-access-token', 'fakeToken')
        .expect(401);
    })
    it('should send 401 if user requests league they do not belong to', () => {
      return request
        .get('/data/league/Essos')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.VHl3aW5fTGFubmlzdGVy.Nvnz-KU18HUCHhQnWDJZB8ajtI2qF9Qm_wvnGLf_m_w')
        .expect(401);
    })
    it('should send 200 if user requests league they belong to', () => {
      return request
        .get('/data/league/Westeros')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.VHl3aW5fTGFubmlzdGVy.Nvnz-KU18HUCHhQnWDJZB8ajtI2qF9Qm_wvnGLf_m_w')
        .expect(200);
    })
  })
})