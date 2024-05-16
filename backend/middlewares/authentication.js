const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const AUTHENTICATION = (req, res, next) => {
    try {
        const authToken = req.headers.token
        const isValid = jwt.verify(authToken, JWT_SECRET)
        if (isValid) {
            next()
        } else {
            res.status(403).json({ msg: "Authentication failed" })
        }
    } catch (err) {
        res.status(500).json({ msg: "errorrrr while auth", err })
        
    }
}

const FrontendAuth = (req,res)=>{
    try{
        const token = req.query.token
        const isValid = jwt.verify(token,JWT_SECRET)
        if(isValid){
            res.status(200).json({msg:"authorized"})
        }else{
            res.status(403).json({msg:"you are not authorized"})
        }
    }catch(err){
        res.status(500).json({msg:"error auth"})
    }
}

module.exports = { AUTHENTICATION, JWT_SECRET,FrontendAuth }