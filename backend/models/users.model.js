const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },  
  phone_number: {
    type: Number,
    require: true,
    unique: true
  },
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
  }, 
  first_name: {
    type: String,
    require: true,
  }, 
  last_name: {
    type: String,
    require: true,
  },
  skills:{
    type: JSON
  },
  profile_pic:{
    type: String,
    default:"profile_pic_testing.png"
  },
  user_type:{
    type: Number,
    default: 1
  }, 
  extra: {
    type: JSON, 
  },
  age: {
    require: true,
    type: Number
  },
  gender: {
    type: String,
    require: true
  },
  address:{
    type: String,
    require: true
  },
  bio: {
    type: String
  }
},{ timestamps: true })

const model = mongoose.model("User", userSchema)
module.exports = model;