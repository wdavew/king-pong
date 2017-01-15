import { getLastMsg, forceSendMsg } from '../../src/server/controllers/msgController';

let request = require('supertest');
request = request('http://localhost:3000');

const testMsg = {
  league: 'Westeros',
  sender: 'Node',
  receiver: 'Tywin_Lannister',
  action: 'Action',
}

describe('createMessage', () => {
  it('responds with 200 if sent to valid user and league', () => {
    return request
      .post('/data/messages/send')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.VHl3aW5fTGFubmlzdGVy.Nvnz-KU18HUCHhQnWDJZB8ajtI2qF9Qm_wvnGLf_m_w')
      .send({ league: 'Westeros', receiver: 'Cersei_Lannister', action: 'Action' })
      .expect(200);
  });

  it('responds with 400 if sent to invalid user', () => {
    return request
      .post('/data/messages/send')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.VHl3aW5fTGFubmlzdGVy.Nvnz-KU18HUCHhQnWDJZB8ajtI2qF9Qm_wvnGLf_m_w')
      .send({ league: 'Westeros', receiver: 'Cersei', action: 'Action' })
      .expect(400);
  });

  it('responds with 401 if sent to valid user outside league', () => {
    return request
      .post('/data/messages/send')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.VHl3aW5fTGFubmlzdGVy.Nvnz-KU18HUCHhQnWDJZB8ajtI2qF9Qm_wvnGLf_m_w')
      .send({ league: 'Vaes Dothrak', receiver: 'Khal_Drogo', action: 'Action' })
      .expect(401);
  });

  it('responds with 401 if unauthorized', () => {
    return request
      .post('/data/messages/send')
      .send({ league: 'Westeros', receiver: 'Cersei_Lannister', action: 'Action' })
      .expect(401);
  });
});

describe('getMessages', () => {
  it('responds with 200 if authorized', () => {
    return request
      .get('/data/messages/get')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.VHl3aW5fTGFubmlzdGVy.Nvnz-KU18HUCHhQnWDJZB8ajtI2qF9Qm_wvnGLf_m_w')
      .expect(200);
  });

  it('responds with 401 if no token provided', () => {
    return request
      .get('/data/messages/get')
      .expect(401);
  });

  it('responds with 401 if invalid token provided', () => {
    return request
      .get('/data/messages/get')
      .set('x-access-token', '.VHl3aW5fTGFubmlzdGVy.Nvnz-ajtI2qF9Qm_wvnGLf_m_w')
      .expect(401);
  });
});

describe('removeMessage', () => {
  let tywinMsg;
  let cerseiMsg;
  beforeAll((done) => forceSendMsg(testMsg).then(() => done()));
  beforeAll((done) => getLastMsg('Tywin_Lannister').then((res) => (tywinMsg = res.id, done())));
  beforeAll((done) => getLastMsg('Cersei_Lannister').then((res) => (cerseiMsg = res.id, done())));
   
  it('responds with 400 if no token provided', () => {
    return request
      .delete(`/data/messages/delete/${tywinMsg}`)
      .expect(401);
  });

  it('responds with 400 if invalid token provided', () => {
    return request
      .delete(`/data/messages/delete/${tywinMsg}`)
      .set('x-access-token', '.VHl3aW5fTGFubmlzdGVy.Nvnz-ajtI2qF9Qm_wvnGLf_m_w')
      .expect(401);
  });

  it('responds with 200 if message exists under current user', () => {
    return request
      .delete(`/data/messages/delete/${tywinMsg}`)
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.VHl3aW5fTGFubmlzdGVy.Nvnz-KU18HUCHhQnWDJZB8ajtI2qF9Qm_wvnGLf_m_w')
      .expect(200);
  });

  it('responds with 401 if message exists under different user', () => {
    return request
      .delete(`/data/messages/delete/${cerseiMsg}`)
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.VHl3aW5fTGFubmlzdGVy.Nvnz-KU18HUCHhQnWDJZB8ajtI2qF9Qm_wvnGLf_m_w')
      .expect(401);
  });

  it('responds with 400 if message does not exist', () => {
    return request
      .delete('/data/messages/delete/0')
      .set('x-access-token', 'eyJhbGciOiJIUzI1NiJ9.VHl3aW5fTGFubmlzdGVy.Nvnz-KU18HUCHhQnWDJZB8ajtI2qF9Qm_wvnGLf_m_w')
      .expect(400);
  });
});

