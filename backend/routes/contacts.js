const express = require('express');
const contacts = require('../models/contacts');
const passport = require('passport');
const router = express.Router();

router.put(
  '/contact',
  passport.authenticate('jwt', { session: false }),
  function(req, res, next) {
    if (req.body) {
      const contact = new contacts(req.body);
      contact.save(err => {
        if (err) {
          res
            .json(err)
            .status(400)
            .end();
          return;
        }
        res.json(contact);
      });
    }
  }
);

router.post(
  '/contact',
  passport.authenticate('jwt', { session: false }),
  function(req, res, next) {
    if (req.body && req.body._id) {
      contacts.findByIdAndUpdate(req.body._id, req.body, (err, contact) => {
        if (err) {
          res.status(500);
          return;
        }
        res.json(contact);
      });
    }
  }
);

router.get(
  '/contacts',
  passport.authenticate('jwt', { session: false }),
  function(req, res, next) {
    if (req.query && req.query.id) {
      contacts.findById(req.query.id, (err, contacts) => {
        if (err) {
          res.status(500);
          return;
        }
        res.json(contacts);
      });
    } else {
      contacts.find({ userId: req.user._id }, (err, contacts) => {
        if (err) {
          res.status(500);
          return;
        }
        res.json(contacts);
      });
    }
  }
);

module.exports = router;
