const mongoose = require('mongoose');
const connectDB = async()=>{
    try{
        const connect = await mongoose.connect("mongodb+srv://venkatajayanth:Jayanth%40MongoDatabase@database.ftglj3w.mongodb.net/workoutapp?retryWrites=true&w=majority",{
            useNewUrlParser : true,
            useUnifiedTopology : true,
        });
        console.log(`MongoDb connected ${connect.connection.host}`)
    }catch(error){
        console.log("error occured",error);
        process.exit(1);
    }
};

module.exports = connectDB;