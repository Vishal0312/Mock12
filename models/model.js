const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number
})

const UserModel = mongoose.model('user',UserSchema)


module.exports={
    UserModel
}


// {
//     "title":"New one 1",
//     "note":"I am starting a new business again",
//     "category":"live class again",
//     "author":"Yo Yo 2"
//    }