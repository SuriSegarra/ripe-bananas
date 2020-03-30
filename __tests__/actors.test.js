const { getActor, getActors, getFilms} = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('actors routes', () => {

  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Britney Spear',
        dob: '03-04-1998',
        pob: 'hospital'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Britney Spear',
          dob: expect.any(String),
          pob: 'hospital',
          __v: 0
        });
      });
  });
  it('gets actors by id', async() => {
    const actor = await getActor();
    const films = await getFilms({ actor: actor._id })
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...actor,
          films
        });
      });
  });
  it('gets all actors', async() => {
    const actor = await getActors();
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actor);
      });
  });
});
