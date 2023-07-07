const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/',ensureAuth , (req, res) => {
  res.render('progress');
});

module.exports = router;