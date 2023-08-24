const express=require('express')
const cors=require('cors')
const app=express()
const {connect}=require('./config/db')

app.use(cors({origin:'*'}))
app.use(express.json())
const {userRoute}=require('./routes/userRoutes')

app.get("/",(req,res)=>{
    res.send("this is home page")
})
app.use('/user',userRoute)

app.listen(8080,async()=>{
    try {
        await connect
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at http://localhost:8080`)
})