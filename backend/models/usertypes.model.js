const mongoose = require("mongoose");

const userTypeSchema = new mongoose.Schema({
  user: 
    {
        type: Number,
        default: 1,
    },
    organization: 
    {
        type: Number,
        default: 2,
    },    
    admin: 
    {
        type: Number,
        default: 9,
    },
}, { timestamps: true });


const model = mongoose.model("UserType", userTypeSchema)
module.exports = model;