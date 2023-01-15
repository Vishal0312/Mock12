const express = require('express')
const {connection} = require('./config/db')
const app = express()
const { UserRouter } = require('./routes/user.routes')
const {NoteRouter} = require('./routes/note.routes')
const { authenticator } = require('./middleware/authenticator.middleware')
require('dotenv').config()
const cors = require('cors')

app.use(express.json())

app.use(cors({
    origin:"*"
}))

app.get('/',(req,res)=>{

    res.send("Welcome to my world")
})
app.use("/user",UserRouter)
app.use(authenticator)
app.use("/note",NoteRouter)



app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("Connection eshtablished")
    }catch(err){
        console.log(err)
        console.log('Something went wrong while connecting')

    }
    console.log('running on 4500')
})