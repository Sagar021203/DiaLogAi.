const express = require("express")
const { signupHandler, loginHandler, aiHandler } = require("../controller/controller")
const { AUTHENTICATION, FrontendAuth } = require("../middlewares/authentication")

const userRoute = express.Router()
const serviceRoute = express.Router()

userRoute.post("/signup",signupHandler)
userRoute.post("/login",loginHandler)
userRoute.get("/auth",FrontendAuth)
serviceRoute.post("/ai",AUTHENTICATION,aiHandler)


module.exports = {userRoute,serviceRoute}