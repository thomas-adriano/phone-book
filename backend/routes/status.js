const express = require('express');
const router = express.Router();

router.get('/status', function(req, res, next) {
  res.json({ msg: 'OK!' });
});

module.exports = router;
