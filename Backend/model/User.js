const mongoose=require("mongoose");
const { sendError } = require("../utils/helper");
const findOrCreate = require('mongoose-findorcreate');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    googleId:{
        type:String,
        required:false
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    photo:{
        type:String,
        required:false
    },
    verified:{
        type:Boolean,
        default:false 
     }
    
});
userSchema.plugin(findOrCreate);
const userdb=mongoose.model('User',userSchema)
module.exports=userdb;
//users

