const express = require('express')
const bcrypt = require('bcrypt')
const {UserModel} = require('../models/model')
const UserRouter = express.Router()
const jwt = require('jsonwebtoken')

UserRouter.post('/signup',async(req,res)=>{
    const {name,email,password,age} = req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
          if(err){
            console.log(err)
          }else{
            const user = new UserModel({email,password:hash,name,age})
            await user.save();
            res.send("Signup successful")
          }  
        })
    }catch(err){
        console.log(err)
        res.send("Something went wrong wile adding the data")
    }
})

UserRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    var token = jwt.sign({ userID:user[0]._id }, 'masai');
                    res.send({"msg":"Login successfull","token":token})               
                }else{
                    res.send("Wrong credentials")
                }
            })
        }else{
            res.send("Wrong credentials")
        }
    }catch(err){
        console.log(err)
        res.send("Something went wrong")
    }
})


module.exports={
    UserRouter
}




// app.get("/about",(req,res)=>{
//     res.send("About section")
// })

// app.get("/data",(req,res)=>{
//     let token=req.headers.token
//     jwt.verify(token, 'masai', function(err, decoded) {
//         if(err){
//             res.send("Invalid token")
//             console.log(err)
//         }else{
//             res.send("Data page")
//         }
//       });
// })

// app.get("/cart",(req,res)=>{
//     let token=req.query.token
//     jwt.verify(token, 'masai', function(err, decoded) {
//         if(err){
//             res.send("Invalid token")
//             console.log(err)
//         }else{
//             res.send("Cart page")
//         }
//       });
// })

// app.get("/contact",(req,res)=>{
//     res.send("About section")
// })
