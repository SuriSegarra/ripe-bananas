const { getReviewer, getFilm, getReviews, getReview } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('reviews routes', () => {
  it('creates a review', async() => {
    const reviewer = await getReviewer();
    const film = await getFilm();
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
          reviewer: expect.any(String),
          review: 'this movie sucks',
          film: expect.any(String),
          __v: 0
        });
      });
  });
  it('gets all reviews', async() => {
    const reviews = await getReviews();
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        expect(res.body).toEqual(reviews);
      });
  });
  it('deletes a review by id', async() => {
    const review = await getReview();
    return request(app)
      .delete(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual(review);
      });
  });
});

