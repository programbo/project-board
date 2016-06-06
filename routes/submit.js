import basicAuth from 'basic-auth';
import config from 'config';
import express from 'express';
import mongoose from 'mongoose';
import 'express-csv';

const router = express.Router(); // eslint-disable-line new-cap
const Enquiry = mongoose.model('enquiry');

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

router.get('/csv', auth, (req, res) => {
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
router.post('/', (req, res) => {
  const payload = req.body;
  const promise = new Enquiry({
    name: payload.name,
    email: payload.email,
    message: payload.message,
    receiveUpdates: payload.receiveUpdates,
    ipAddress: req.ip
  }).save();
  promise.then(enquiry => {
    res.json(enquiry);
  }).catch((err) => {
    res.status(502).json({ error: err });
  });
});

module.exports = router;
