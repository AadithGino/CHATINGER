const userSchema = require("../../model/usermodel");
const chatSChema = require("../../model/chatModel")
exports.Home = async(req,res)=>{
  try {
    chatSChema.find({$or:[{user1:req.body.id},{user2:req.body.id}]}).then((data)=>{
      res.status(200).json(data)
    })
  } catch (error) {
    
  }
}

exports.SearchUser = async (req, res) => {
  console.log(req.body.search);
  try {
    const searchKeyword = req.body.search;
   userSchema
      .find({
        fullname: { $regex: ".*" + searchKeyword + ".*", $options: "i" },
      })
      .find({ _id: { $ne: req.body.id } }).then((data)=>{
        res.status(200).json(data)
        console.log(data);
      })
      
  } catch (error) {
    res.status(400).json(error);
  }
}

exports.findUserDetails = async(req,res)=>{
  try {
    let id = req.query.id;
    userSchema.findOne({_id:id}).then((data)=>{
      res.status(200).json(data)
    })
  } catch (error) {
    
  }
}
