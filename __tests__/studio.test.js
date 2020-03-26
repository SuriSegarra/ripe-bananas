const request = require('supertest');
const app = require('../lib/app');

describe('studio routes', () => {
  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'The cool Studio',
        address: {
          city: 'Miami',
          state: 'Florida',
          country: 'United States'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'The Cool Studio',
          address: {
            city: 'Miami',
            state: 'Florida',
            country: 'United States'
          },
          __v: 0
        });
      });
  });
});
