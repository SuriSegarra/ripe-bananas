const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating:{
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer',
    require: true
  },
  review:{
    type: String, 
    maxlength: 140,
    required: true
  },
  film:{
    type: mongoose.Types.ObjectId,
    ref: 'Film',
    required: true
  }
});

module.exports = mongoose.model('Review', reviewSchema);
