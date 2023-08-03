const express = require('express');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router();
const mongoose = require('mongoose');
const { localsName } = require('ejs');
router.get('/',ensureAuth,(req,res)=>{
    res.render('home');
})
router.get('/addexercise',ensureAuth,(req,res)=>{
    res.render('addexercise');
})
const exercise = mongoose.model('Exercise')
router.post('/addexercise', ensureAuth,async(req,res)=>{
    console.log(req.body)
    const newexercise = {
        userid:req.user.google_id,
        name:req.body.name.toLowerCase().split(" ").join(""),
        intensity:req.body.intensity,
        time:req.body.duration
    }
    // const createdexercise = await exercise.create(newexercise)
    const fun = async()=>{
        // console.log(req.user.google_id)
        let findexercise = await exercise.findOne({userid:req.user.google_id, name:req.body.name.toLowerCase().split(" ").join("")})
        if(findexercise){
            console.log("already present in workout log",findexercise)
        }
        else{
            const createdexercise = await exercise.create(newexercise)
            console.log("created new exercise", createdexercise);
        }
    }
    fun();
    
    res.send({status:"success"})
})
router.get('/workout', ensureAuth, async(req,res)=>{
    let findexercise = await exercise.find({userid:req.user.google_id});
    // console.log(findexercise.length);
    res.locals.list = findexercise;
    res.render('workout');
})
router.post('/workout', ensureAuth, async(req,res)=>{
    let findexercise = await exercise.find({userid:req.user.google_id});
    const pastworkout = mongoose.model('pastworkout');
    let exerciselist = [];
    let intensitylist = [];
    let repslist = [];
    for(let i = 0; i < findexercise.length; i++) {
        if(req.body.reps[i]!='0'){
            exerciselist.push(findexercise[i].name);
            intensitylist.push(req.body.intensity[i]);
            repslist.push(req.body.reps[i]);
        }
    }
    const d = new Date();
    let date = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
    const newworkout = {
        userid:req.user.google_id,
        date:date,
        exerciseList:exerciselist,
        intensityList:intensitylist,
        repsList:repslist,
        time:req.body.time
    }
    // console.log(exerciselist);
    // console.log(repslist);
    // console.log(intensitylist);
    // console.log(newworkout)
    // console.log(req.body.time);
    const fun = async()=>{
        try{
            const createworkout = await pastworkout.create(newworkout)
            console.log("created new workout", createworkout);
        }
        catch(err){
            console.log(err)
        }
    }
    if(repslist.length > 0 && req.body.time > 0){
        fun(); 
    }
    else{
        console.log("invalid reps list");
    }
    res.send({status:"success"})
})
module.exports = router;