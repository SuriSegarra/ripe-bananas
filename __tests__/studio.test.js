const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
require('dotenv').config();

describe('studio routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
    
  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'The Cool Studio',
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
