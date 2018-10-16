const USERS = require('../models/users');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const AUTH = require('../auth');

router.post('/login', function(req, res) {
  const noCode = !req || !req.body || !req.body.code;
  if (noCode) {
    res.status(401).end();
    return;
  }

  USERS.findByCode(req.body.code, (err, user) => {
    if (err) {
      res
        .json({ msg: JSON.toString(err) })
        .status(500)
        .end();
      return;
    }
    if (user && user.length) {
      user = user[0];
      const token = jwt.sign(
        { sub: user.id, aud: AUTH.JWT_AUDIENCE, iss: AUTH.JWT_ISSUER },
        AUTH.JWT_SECRET
      );
      res.json({ user, token });
    } else {
      res.status(401).end();
    }
  });
});

module.exports = router;
