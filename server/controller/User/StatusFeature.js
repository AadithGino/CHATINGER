const statusSchema = require("../../model/statusModel");
const chatSchema = require("../../model/chatModel")
exports.uploadStatus = async (req, res) => {
  try {
    const id = req.body.id;
    let details;

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

    statusSchema.create( details ).then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getStatus = async (req, res) => {
  try {
    console.log("STATY");
    statusSchema.find({}).then((data)=>{
      res.status(200).json(data)
    })
   
  } catch (error) {

  }
};
