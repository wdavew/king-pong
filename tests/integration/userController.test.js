import {
  findUser,
  findUsersOfLeague,
  findUserLeagues,
  getNewElo,
  createNewUser,
  joinLeague,
  authenticateUser,
  dropUser,
} from '../../src/server/controllers/userController';

let request = require('supertest');
request = request('http://localhost:3000');

// the plan for testing this:

// write separate unit tests for the actual database controllers

// write integration routes using a test database by mocking it somehow
// or using a different environment / dedicated test users

describe('authenticateUser', () => {
  it('should send 401 if username not found', () => {
    return request
      .post('/sessions/create')
      .send({ username: 'Fake', password: 'Fake' })
      .expect(401);
  });

  it('should send 401 if username is found but password does not match', () => {
    return request
      .post('/sessions/create')
      .send({ username: 'Tywin_Lannister', password: 'Fake' })
      .expect(401);
  });
  it('should send 200 if username is found with matching password', () => {
    return request
      .post('/sessions/create')
      .send({ username: 'Tywin_Lannister', password: 'cat' })
      .expect(200);
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
  it('should return an array of user\'s leagues ', () => {
    return request
      .get('/data/userInfo')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.VHl3aW5fTGFubmlzdGVy.Nvnz-KU18HUCHhQnWDJZB8ajtI2qF9Qm_wvnGLf_m_w')
      .expect({
        username: 'Tywin_Lannister',
        league: 'Westeros',
        elo: 1200,
        games: 0,
        wins: 0,
        leagues: ['Westeros'],
      });
  })
});

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

describe('createNewUser', () => {
  beforeAll((done) => dropUser('TestUser').then(() => done()));

  it('should send 200 if user does not exist', () => {
    return request
      .post('/createNewUser')
      .send({
        username: 'TestUser',
        password: 'TestUserPassword',
      })
      .expect(200);
  });

  it('should send 400 if user already exists', () => {
    return request
      .post('/createNewUser')
      .send({
        username: 'TestUser',
        password: 'TestUserPassword',
      })
      .expect(400);
  });
});


describe('joinLeague', () => {
  it('should send 200 if user is not in league', () => {
    return request
      .post('/data/leagues/join')
      .send({
        league: 'Essos',
      })
      .expect(200);
  });
  it('should send 400 if user is already in league', () => {
    return request
      .post('/data/leagues/join')
      .send({
        league: 'Essos',
      })
      .expect(400);
  });
  it('should send 400 if user is already in league', () => {
    return request
      .post('/data/leagues/join')
      .send({
        league: 'Essos',
      })
      .expect(400);
  });
});

