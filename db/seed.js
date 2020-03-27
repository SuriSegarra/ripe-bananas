const Studio = require('../lib/models/Studio');
const chance = require('chance').Chance();
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');

//giving me a random generated thing
module.exports = async({ studiosToCreate = 10, actorsToCreate = 10, reviewersToCreate = 10 } = {}) => {
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
};

