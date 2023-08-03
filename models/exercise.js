const mongoose = require('mongoose');
const ExerciseSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    intensity:{
        type: String,
        required: true
    },
    time:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Exercise', ExerciseSchema);