const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  favoriteDishes: [{
    type: String,
    trim: true,
    default: []
  }]
});

module.exports = mongoose.model('User', UserSchema);