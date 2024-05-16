const Users = require("../config/database")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../middlewares/authentication")
const { signupSchema, loginSchema } = require("../config/input_validation")

const signup = async (req,res)=>{
    try{
        const userInputs = signupSchema.safeParse(req.body)
        if(userInputs.success){
            const email = userInputs.data.email
            const username = userInputs.data.username
            const password = userInputs.data.password
            const emailWithoutExtraSpaces = email.split(" ").join("")
            const usernameWithoutExtraSpaces = username.split(" ").join("")
            const passwordWithoutExtraSpaces = password.split(" ").join("")

            const userExists = await Users.findOne({username:usernameWithoutExtraSpaces,email:emailWithoutExtraSpaces})
            if(userExists){
                res.json({msg:"User already exists, go to login page"})
            }else{
                const hashedPassword = await bcrypt.hash(passwordWithoutExtraSpaces,10)
                const addUser = await new Users({
                    email:emailWithoutExtraSpaces,
                    username:usernameWithoutExtraSpaces,
                    password:hashedPassword
                })
                await addUser.save()
                res.json({msg:"User created"})
            }
        }else{
            res.json({msg:"Invalid Inputs"})
        }
    }catch(err){
        res.json({msg:"erorrrr while signup",err})
        console.log(err)
    }
}

const login = async (req,res)=>{
    try{
        const userInputs = loginSchema.safeParse(req.body)
        if(userInputs.success){
            const username = userInputs.data.username
            const password = userInputs.data.password
            const userExists = await Users.findOne({username:username})
            const validPassword = await bcrypt.compare(password,userExists.password)
            if(userExists){
                if(validPassword){
                    const token = jwt.sign({username},JWT_SECRET)
                    // res.status(200).json({token})
                    res.status(200).json({token,username})
                } else{
                    res.status(411).json({msg:"your password is invalid"})
                }       
            }else{
                res.status(403).json({msg:"User doesn't exists"})
            }
        }else{
            res.status(411).json({msg:"Invalid inputs"})
        }
    }catch(err){
        res.status(500).json({msg:"errorrrr while login",err})
        console.log(err)
    }
}

module.exports = {signup,login}