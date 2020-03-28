const { getReview, getReviews, getReviewer, getFilm } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('reviews routes', () => {
    it('creates a review', async() => {
        const reviewer = await getReviewer();
        const film = getFilm();
        .post('/api/v1/reviews')
        .send({
            rating: 5,
            review: 'this movie sucks',
            film: film._id
        });
    });
});