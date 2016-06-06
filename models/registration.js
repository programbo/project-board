const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Registration = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  interest: {
    type: String,
    required: true
  },
  datetime: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    required: true
  },
  receiveUpdates: {
    type: Boolean,
    default: false
  }
});

module.exports = Registration;
