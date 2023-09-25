const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
    follower_id: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      followed_id : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
      ]
}, { timestamps: true });

const model = mongoose.model("Followers", followerSchema);
module.exports = model;