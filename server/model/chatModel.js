const mongoose = require("mongoose");

const chatSChema = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    members :[{type:mongoose.Schema.Types.ObjectId}],
    latestMessage: {type:String},
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("CHAT", chatSChema);

module.exports = model;
