const mongoose = require('mongoose');

const forumNames = mongoose.Schema({
  name: {
    type: String,
    tri: true,
    required: true,
    lowercase: true,
    unique: true,
  },
  image: {
    type: String,
    default: 'default.png'
  },
  member: [{
    username: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    }
  }]
});

module.exports = mongoose.model('Forum', forumNames);
