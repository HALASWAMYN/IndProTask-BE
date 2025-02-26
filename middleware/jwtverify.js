const jwt = require('jsonwebtoken')
const user=require('../model/usermodel')



const jwtverify = async (req, resp, next) => {
    const { authorization } = req.headers 
    const token = authorization?.split(" ")[1]
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)
            const userdetails=await user.findById({_id:decoded._id})
            if(userdetails){
                req.user = userdetails;
                next()
            }           
        }
        catch {
            return resp.status(200).send({ success: false, message: "Invalid Credentails" });
        }
    }
    else {
        console.log("not token in header")
        return  resp.status(200).send({success :false ,message:"No Token Provided"});
    }

}

module.exports = {jwtverify}