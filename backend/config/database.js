const mongoose = require("mongoose")
const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(`${DATABASE_URL}`)

const userModel = {
    email:String,
    username:String,
    password:String
}

const Users = mongoose.model("Users", userModel)

module.exports = Users