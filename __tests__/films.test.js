const request = require('supertest');
const app = require('../lib/app');
const { getFilm, getFilms, getActor, getStudio, getReviews } = require('../db/data-helpers');


describe('app routes', () => {

  it('creates a film', async() => {
    const studio = await getStudio();
    const actor = await getActor();
   
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'some title',
        studio: studio._id,
        released: 2005,
        cast: [{
          role: 'some role',
          actor: actor._id
        }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'some title',
          studio: expect.any(String),
          released: 2005,
          cast: [{
            _id: expect.any(String),
            role: 'some role',
            actor: expect.any(String)
          }],
          __v: 0
        });
      });
  });
});
