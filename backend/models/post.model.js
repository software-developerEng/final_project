const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "userModel",
  },
  userModel: {
    type: String,
    enum: ["User", "Organization"],
  },
  comments: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  pictures: [String],
  caption: String,
}, { timestamps: true });

const model = mongoose.model("Post", postSchema)
module.exports = model;
