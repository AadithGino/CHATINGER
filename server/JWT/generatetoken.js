const jwt = require("jsonwebtoken")


const generateToken = (id) =>{
    return jwt.sign({id},"CHATINGER1234",{
        expiresIn:"30d"
    });
};

module.exports = generateToken;