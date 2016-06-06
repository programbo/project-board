const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Enquiry = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
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

module.exports = Enquiry;
