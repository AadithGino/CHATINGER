const statusSchema = require("../../model/statusModel");
const chatSchema = require("../../model/chatModel");

// upload status 

exports.uploadStatus = async (req, res) => {
  try {
    const id = req.body.id;
    let details;
    console.log(req.body.image + "THIS IS IMAGE");
    if (req.body.image) {
      details = {
        isFile: true,
        userid: id,
        content: req.body.image,
      };
    } else {
      details = {
        isFile: false,
        userid: id,
        content: req.body.message,
      };
    }

    statusSchema.create(details).then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};


// get status

exports.getStatus = async (req, res) => {
  try {
    console.log("STATY");
    statusSchema.find({}).then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {}
};


// getting the logged in user details. 

exports.getMyStatus = async (req, res) => {
  try {
    const id = req.query.id;
    statusSchema.findOne({ userid: id }).then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {}
};
