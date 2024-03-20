const express=require("express")
const { Connection } = require("./config/db")
const { userRoute } = require("./routes/userroutes")

require("dotenv").config()


const app=express()
app.use(express.json())

app.get("/masai",(req,res)=>{
    res.status(201).send({"msg":"welcome to masai library, please register to continue"})
})

app.use("/user",userRoute)

app.listen(process.env.PORT,async(req,res)=>{
    try {
        await Connection
        console.log("server connected to database")
        console.log(`server is running at ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }

})


