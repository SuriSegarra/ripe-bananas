const { getReviewer, getReviewers } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('reviewers routes', () => {

  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'reviewers-test',
        company: 'review-company test'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'reviewers-test',
          company: 'review-company test',
          __v: 0
        });
      });
  });
});
