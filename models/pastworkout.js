const mongoose = require('mongoose');
const pastworkoutschema = new mongoose.Schema({
    userid:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    exerciseList:{
        type:Array,
        required:true
    },
    intensityList:{
        type:Array,
        required:true
    },
    repsList:{
        type:Array,
        required:true
    },
    time:{
        type:Number,
        required:true
    }
})
module.exports = mongoose.model('pastworkout',pastworkoutschema);