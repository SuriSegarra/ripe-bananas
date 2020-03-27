const request = require('supertest');
const app = require('../lib/app');
const { getStudios, getStudio } = require('../db/data-helpers');
describe('studio routes', () => {

    
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

  it('gets studio by id', async() => {
    const studio = await getStudio();
    return request(app) 
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...studio
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
