const mongoose = require('mongoose');

const reviewerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    name: String,
    required: true
  }
});

module.exports = mongoose.model('Reviewer', reviewerSchema);
