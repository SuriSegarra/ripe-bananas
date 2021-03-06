const request = require('supertest');
const app = require('../lib/app');
const { getFilm, getFilms, getActor, getStudio,  } = require('../db/data-helpers');



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
          actor: actor._id,
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

  it('gets a film by id', async() => {
    const film = await getFilm();
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual(film);
      });
  });

  it('gets all films', async() => {
    const films = await getFilms();
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual(films);
      });
  });
});
