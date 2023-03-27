const jwt = require("jsonwebtoken");


const authMiddleware = async (req,res,next) =>{
    const token = req.headers?.authorization?.split(" ")[1];

    if(token){
        const decoded = jwt.verify(token,"key");
        console.log(decoded);
        if(decoded){
            req.body.userId = decoded.userId;
            next();
        }else{
            res.status(400).send({success:false,message:"You are not authorize"});
        }
    }else{
        res.status(400).send({success:false,message:"You are not authorize"});
    }

}

module.exports = {
    authMiddleware
}