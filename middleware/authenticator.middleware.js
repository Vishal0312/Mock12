const jwt = require('jsonwebtoken')

const authenticator=(req,res,next)=>{
    const token = req.headers.token
    if(token){
        const decoded = jwt.verify(token,'masai')
        if(decoded){
            const  userID = decoded.userID
            req.body.userID = userID
            next()
        }else{
            res.send("Not Authorized,Please login")
        }
    }else{
        res.send("Not Authorized,Please login")
    }
}

module.exports={
    authenticator
}