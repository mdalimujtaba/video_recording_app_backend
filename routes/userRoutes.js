const express=require('express')
const jwt=require('jsonwebtoken')
const {userModel}=require('../models/userModels')

const userRoute=express.Router()

userRoute.get('/',async(req,res)=>{
    try {
        const data=await userModel.find() 
        res.send({"msg":'You got the data','output':data})
    } catch (error) {
        res.send({'msg':"Something went wrong"})
    }
})

userRoute.post('/login',async(req,res)=>{
    try {
        var {name,email}=req.body
        let login=await userModel.find({email})
        if(login[0].email===email){
            const token=jwt.sign({'name':name},'recordingApp')
            res.send({'msg':"login successfull",'token':token})
          
        }
    } catch (error) {
        const {name,email}=req.body
        let signup=new userModel({name,email})
        await signup.save()
        console.log(signup)
        res.send({'msg':'signup successfull'})
       
       
    }
})


module.exports={
    userRoute
}