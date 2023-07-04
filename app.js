const express = require('express')
const app = express();
const path = require('path');
app.set("view engine", 'ejs');
app.use(express.static('public'))
app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/login',(req,res)=>{
    res.render('login')
});
app.get('/goals',(req,res)=>{
    res.render('goals')
})
app.get('/progress',(req,res)=>{
    res.render('progress')
})
app.get('/training',(req,res)=>{
    res.render('training')
})
app.listen(4000,()=>{
    console.log("server is running on port 4000");
})