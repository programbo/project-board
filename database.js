import mongoose from 'mongoose';
import enquiry from './models/enquiry';
import registration from './models/registration';

module.exports = (connectionString) => {
  mongoose.model('enquiry', enquiry);
  mongoose.model('registration', registration);
  mongoose.connect(connectionString);
};
