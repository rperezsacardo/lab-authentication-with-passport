'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String
    },

    nick: {
      type: String
    },
    game: {
      type: String
    },
    birthyDay: {
      type: Date
    },
    email: {
      type: String
    },
    avatar: {
      type: String
    },
    githubId: {
      type: String
    },
    passwordHash: {
      type: String
    },
    role: {
      type: String,
      enum: ['cat', 'dog', 'bird']
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
