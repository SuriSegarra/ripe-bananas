const { getReview, getReviews, getReviewer, getFilm } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('reviews routes', () => {
  it('creates a review', async() => {
    const reviewer = await getReviewer();
    const film = getFilm();
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 5,
        reviewer: reviewer._id,
        review: 'this movie sucks',
        film: film._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: expect.any(Number),
          reviewer: reviewer._id,
          review: expect.any(String),
          film: film._id,
          __v: 0
        });
      });
  });
});

