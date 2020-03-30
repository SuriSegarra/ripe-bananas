const Studio = require('../lib/models/Studio');
const chance = require('chance').Chance();
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Review = require('../lib/models/Review');
const Film = require('../lib/models/Film');

//giving me a random generated thing
module.exports = async({ studiosToCreate = 10, actorsToCreate = 10, reviewersToCreate = 10, filmsToCreate = 10, reviewsToCreate = 10 } = {}) => {
//using Studio model to create an array of 10 things, putting data, mapping through it (making a copie, not mutating) 
//followting the schema and adding random thing. 
  const studios = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.name(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

  const actors = await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.name(),
    dob: chance.date(),
    pob: chance.city()
  })));

  const reviewers = await Reviewer.create([...Array(reviewersToCreate)].map(() => ({
    name: chance.name(),
    company: chance.company()
  })));

  const films = await Film.create([...Array(filmsToCreate)].map(() => ({
    title: chance.profession(),
    studio: chance.pickone(studios),
    released: chance.integer(),
    cast: [{
      role: chance.animal(),
      actor: chance.pickone(actors)
    }]
  })));
  await Review.create([...Array(reviewsToCreate)].map(() => ({
    rating: chance.integer ({ min: 1, max: 5 }),
    reviewer: chance.pickone(reviewers)._id,
    review: chance.sentence({ sentence: 1 }),
    film: chance.pickone(films)._id
  })));
};

