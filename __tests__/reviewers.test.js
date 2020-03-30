const { getReviewer, getReviewers, getReviews } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('reviewers routes', () => {

  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'some name',
        company: 'some company',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'some name',
          company: 'some company',
          id: expect.any(String),
          __v: 0
        });
      });
  });
  it('gets a reviewer by id', async() => {
    const reviewer = await getReviewer();
    const reviews = await getReviews({ reviewer: reviewer._id });

    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          reviews: expect.arrayContaining(reviews)
        });
      });
  });
  it('gets all reviewers', async() => {
    const reviewer = await getReviewers();
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });
  });
  it('updates a reviewer by id', async() => {
    const reviewer = await getReviewer();
    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer
        });
      });
  });
});
