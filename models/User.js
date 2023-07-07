const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    google_id:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('User',userSchema);