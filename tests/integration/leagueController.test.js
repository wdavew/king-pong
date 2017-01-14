import {
  deleteLeague,
  createNewLeague,
} from '../../src/server/controllers/leagueController';

let request = require('supertest');
request = request('http://localhost:3000');

describe('leagueController', () => {
  beforeAll((done) => deleteLeague('2167384295').then(() => done()));

  it('responds with 200 on creating a league', () => {
    return request
      .post('/data/createNewLeague/newLeague')
      .send({ league: '2167384295' })
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.VHl3aW5fTGFubmlzdGVy.Nvnz-KU18HUCHhQnWDJZB8ajtI2qF9Qm_wvnGLf_m_w')
      .expect(200);
  });
  it('responds with 401 if not authenticated', () => {
    return request
      .post('/data/createNewLeague/newLeague')
      .send({ league: '2167384295' })
      .expect(401);
  });
  it('responds with 400 if authorized but league already exists', () => {
    return request
      .post('/data/createNewLeague/newLeague')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.VHl3aW5fTGFubmlzdGVy.Nvnz-KU18HUCHhQnWDJZB8ajtI2qF9Qm_wvnGLf_m_w')
      .send({ league: '2167384295' })
      .expect(400);
  });
});
