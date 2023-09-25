const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user_id: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
  ],
  post_id: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
  ],
}, { timestamps: true });


const model = mongoose.model("Comment", commentSchema)
module.exports = model;