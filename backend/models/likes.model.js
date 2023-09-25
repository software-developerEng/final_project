const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
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


const model = mongoose.model("Like", likeSchema)
module.exports = model;