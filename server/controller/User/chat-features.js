const chatSchema = require("../../model/chatModel");
const userSchema = require("../../model/usermodel");
const userMessage = require("../../model/MessageModel");
const { db } = require("../../model/chatModel");
const { ObjectId } = require("mongodb");

let chatid;
let details;
exports.AccessChat = async (req, res) => {
  const { senderId } = req.body;
  try {
    let userid = req.body.id;
    let user2 = req.body.user;
    console.log(userid);
    console.log(user2);
    chatSchema
      .findOne({ members: { $all: [userid, user2] }, isGroupChat: false })
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          chatSchema.create({ members: [userid, user2] }).then((result) => {
            res.status(200).json(result);
          });
        }
      });
  } catch (error) {}
};

exports.GetChats = async (req, res) => {
  let users = [];
  try {
    let id = req.query.id;``
    let secondid = req.query.id;
    chatSchema
      .find({ members: { $in: [id] } })
      .sort({ updatedAt: -1 })
      .then((data) => {
        res.status(200).json(data);
      });
  } catch (error) {}
};

exports.sendMessage = async (req, res) => {
  let chatid = req.body.chatid;
  const message = req.body.message;
  try {
    let message = req.body.message;
    let details;

    if (req.body.image) {
      details = {
        chatid: ObjectId(chatid),
        isFile: true,
        content: req.body.image,
        sender: req.body.id,
        time: Date.now(),
      };
    } else {
      details = {
        chatid: ObjectId(chatid),
        isFile: false,
        content: message,
        sender: req.body.id,
        time: Date.now(),
      };
    }

    chatSchema
      .updateOne({ _id: chatid }, { $push: { messages: [details] } })
      .then((data) => {
        res.status(200).json([details]);
      });

    // userMessage.create(details).then((data) => {
    //   if (req.body.image) {
    //     chatSchema
    //       .updateOne({ _id: chatid }, { $set: { latestMessage: "Image" } })
    //       .then((result) => {
    //         console.log(result);
    //       });
    //   } else {
    //     chatSchema
    //       .updateOne({ _id: chatid }, { $set: { latestMessage: message } })
    //       .then((result) => {
    //         console.log(result);
    //       });
    //   }
    //   res.status(200).json(data);
    // });
  } catch (error) {}
};

// creating a group chat

exports.createGroupChat = async (req, res) => {
  try {
    const groupAdmin = req.body.id;
    let members = JSON.parse(req.body.members);
    console.log(req.body.members);
    if(members.length < 2){
      res.status(400).json("AT LEAST 2 MEMBERS SHOULD BE IN A GROUP")
      console.log("AT LEAST 2 MEMBERS SHOULD BE IN A GROUP");
    }else{
      const groupchat = {
        chatName: req.body.chatName,
        isGroupChat: true,
        members,
        groupAdmin,
      };
      chatSchema.create(groupchat).then((data) => {
        res.status(201).json(data);
      });
    }
   
  } catch (error) {}
};

exports.getMessages = async (req, res) => {
  try {
    let id = req.query.id;
    console.log(id);
    chatSchema.findOne({ _id: id }).then((data) => {
      res.status(200).json(data.messages);
      console.log(data.messages);
    });
  } catch (error) {}
};

exports.GropMembers = async (req, res) => {
  console.log("THIS IS THE GROUP DATA FETCHING ");
  chatSchema
    .aggregate([
      { $match: { _id: ObjectId(req.query.id) } },
      { $unwind: "$members" },
      {
        $project: {
          member: "$members",
        },
      },
      {
        $project: {
          user: "$member",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "USERS",
        },
      },
      {
        $project: {
          _id: 0,
          user: "$USERS",
        },
      },
    ])
    .then((data) => {
      res.status(200).json(data);
    });
};
