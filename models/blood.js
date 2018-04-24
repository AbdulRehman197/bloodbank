const mongoose = require("mongoose");


// Create Schema  
const Schema  = mongoose.Schema;

const BloodSchema  = new Schema({
    title :{
        type:String,
        required:true
    },
    bloodgroup:{
        type:String,
        required:true

    },
    phone:{
        type:Number,
        required:true
    },
    details :{
        type:String,
        required:true
    },
    user :{
        type:String,
        required :true
    },
    Date :{
        type:Date,
        default:Date.now
    }
});

mongoose.model('bloodbank',BloodSchema);