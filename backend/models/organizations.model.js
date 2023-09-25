const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },  
  phone_number: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  users: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      },
      isAdmin: {
        type: Boolean,
        default: false
      }
    }
  ],
  user_type: {
    type: Number,
    default: 2
  },
  address: [String]
}, { timestamps: true });

const model = mongoose.model("Organization", organizationSchema);
module.exports = model;
