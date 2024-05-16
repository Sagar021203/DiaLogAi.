const ai = require("../services/aiAPI")
const { signup, login } = require("../services/users")

const signupHandler = (signup)
const loginHandler = (login)
const aiHandler = (ai)

module.exports = {signupHandler,loginHandler,aiHandler}