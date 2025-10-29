const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        unique:true

    },
    role:{
        type:String,
        enum:['owner','staff'],
        default:'staff',
        required:true
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

const user = mongoose.model("user",userSchema);

module.exports = user;