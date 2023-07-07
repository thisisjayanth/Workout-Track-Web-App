const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router();

router.get('/',ensureAuth,(req,res)=>{
    res.render('goals')
})
router.post('/',(req,res)=>{
    res.send('<h1>Goals</h1>');
})

module.exports = router;