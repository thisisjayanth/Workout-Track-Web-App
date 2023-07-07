const express = require('express')
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const { ensureAuth, ensureGuest } = require('./middleware/auth');
//importing database file and connecting it
const connectDB = require('./config/db');
connectDB();

const app = express();

require('./models/User')
require('./config/passport');

//middle wares
app.use(session({
    secret:'mysecretkey',
    resave:false,
    saveUninitialized: true,
    store: new mongoStore({mongooseConnection: mongoose.connection}), 
}));

app.use(passport.initialize());
app.use(passport.session());

//setting ejs as template engine
app.set("view engine", 'ejs');

//inform express about public folder
app.use(express.static('public'))
app.use(express.json());

app.get('/', ensureAuth,(req,res)=>{
    res.render('home')
})

app.get('/login', ensureGuest,(req,res)=>{
    res.render('login')
});

//routes
app.use('/auth',require('./routes/auth'));
app.use('/goals', require('./routes/goals'));
app.use('/progress', require('./routes/progress'));
app.use('/training', require('./routes/training'));

app.get('*',(req,res)=>{
    res.render('notfound')
})
app.listen(4000,()=>{
    console.log("server is running on port 4000");
})