const zod = require("zod")

const loginSchema = zod.object({
    username:zod.string(),
    password:zod.string()
})

const signupSchema = zod.object({
    email:zod.string(),
    username:zod.string(),
    password:zod.string()
})

const aiSchema = zod.object({
    prompt:zod.string()
})

module.exports = {aiSchema,loginSchema,signupSchema}