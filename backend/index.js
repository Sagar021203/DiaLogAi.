require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { userRoute, serviceRoute } = require("./routes/routes")
const app = express()
app.use(cors())
app.use(express.json())

app.use("/api",userRoute)
app.use("/api",serviceRoute)

app.use((err,req,res,next)=>{
    res.status(411).json({msg:"error occured",err})
})

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`This server is running on port ${PORT}`)
})
