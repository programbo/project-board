import basicAuth from 'basic-auth';
import config from 'config';
import express from 'express';
import mongoose from 'mongoose';
import 'express-csv';

const router = express.Router(); // eslint-disable-line new-cap
const Enquiry = mongoose.model('enquiry');
const Registration = mongoose.model('registration');

const auth = (req, res, next) => {
  const user = basicAuth(req);
  function unauthorized() {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  }

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  }

  if (user.name === config.get('csv.csvUsername') && user.pass === config.get('csv.csvPassword')) {
    return next();
  }
  return unauthorized(res);
};

router.get('/getintouch-csv', auth, (req, res) => {
  Enquiry.find()
    .then((enquiries) => {
      const csv = enquiries.map((enquiry) => ({
        name: enquiry.name,
        email: enquiry.email,
        message: enquiry.message,
        receiveUpdates: enquiry.receiveUpdates,
        ipAddress: enquiry.ipAddress,
        datetime: enquiry.datetime
      }));
      csv.unshift({
        name: 'Name',
        email: 'Email',
        message: 'Message',
        receiveUpdates: 'Optin',
        ipAddress: 'IP Address',
        datetime: 'Submission Time'
      });
      return res.csv(csv);
    });
});
router.get('/registration-csv', auth, (req, res) => {
  Registration.find()
    .then((registrations) => {
      const csv = registrations.map((registration) => ({
        name: registration.name,
        email: registration.email,
        interest: registration.interest,
        receiveUpdates: registration.receiveUpdates,
        ipAddress: registration.ipAddress,
        datetime: registration.datetime
      }));
      csv.unshift({
        name: 'Name',
        email: 'Email',
        interest: 'Interest',
        receiveUpdates: 'Optin',
        ipAddress: 'IP Address',
        datetime: 'Submission Time'
      });
      return res.csv(csv);
    });
});
router.post('/', (req, res) => {
  const payload = req.body;
  let promise;
  switch (payload.type) {
  case 'getintouch':
    promise = new Enquiry({
      name: payload.name,
      email: payload.email,
      message: payload.message,
      receiveUpdates: payload.receiveUpdates,
      ipAddress: req.ip,
      comment: payload.comment
    }).save();
    break;
  case 'register':
    promise = new Registration({
      name: payload.name,
      email: payload.email,
      interest: payload.interest,
      receiveUpdates: payload.receiveUpdates,
      ipAddress: req.ip,
      comment: payload.comment
    }).save();
    break;
  default:
    return res.status(502).json({ error: 'Unknown Form type' });
  }
  return promise.then(enquiry => {
    res.json(enquiry);
  }).catch((err) => {
    res.status(502).json({ error: err });
  });
});

module.exports = router;
