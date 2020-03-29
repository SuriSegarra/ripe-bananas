const request = require('supertest');
const app = require('../lib/app');
const { getStudios, getStudio, getFilms } = require('../db/data-helpers');

describe('studio routes', () => {

  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'the cool studio',
        address: {
          city: 'Miami',
          state: 'Florida',
          country: 'united states'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'the cool studio',
          address: {
            city: 'Miami',
            state: 'Florida',
            country: 'united states'
          },
          id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets studio by id', async() => {
    const studio = await getStudio();
    const films = await getFilms({ studio: studio._id });
    return request(app) 
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...studio,
          films
        });
      });
  });
  it('gets all studios', async() => {
    const studios = await getStudios();
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual(studios);
      });
  });
});
