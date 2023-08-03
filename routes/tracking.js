const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router();
const mongoose = require('mongoose');
router.get('/',ensureAuth,async(req,res)=>{
    const pastworkout = mongoose.model('pastworkout')
    const pastworkouts = await pastworkout.find()
    // console.log(pastworkouts)
    res.locals.pastworkouts = pastworkouts;
    res.render('tracking');
})

module.exports = router;