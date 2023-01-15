const express = require('express')
const NoteRouter = express.Router()
const {NoteModel} = require('../models/note.nodel')

NoteRouter.get('/',async(req,res)=>{
    try{
        const notes = await NoteModel.find()
        res.send(notes)
    }catch(err){
        console.log(err)
        res.send('Something wrong')
    }
})

NoteRouter.post('/create',async(req,res)=>{
    const data = req.body
    try{
        let note = new NoteModel(data)
        await note.save()
        res.send('Note is added')
    }catch(err){
        console.log(err)
        res.send('Something went wrong')
    }
    res.send("Added the note")
})

NoteRouter.patch('/update/:id',async(req,res)=>{
    const payload = req.body
    const ID = req.params.id
    const note = await NoteModel.find({_id:ID})
    const userID_in_note = note[0].userID 
    const userID_making_request = req.body.userID
    try{
        if(userID_in_note!=userID_making_request){
            res.send('You are not authorized')
        }else{
            await NoteModel.findByIdAndUpdate({_id:ID},payload)
        res.send(`Updated the note with id - ${ID}`)
        }
        
    }catch(err){
        console.log(err)
        res.send('Something went wrong')
    }
    
})

NoteRouter.delete('/delete/:id',async(req,res)=>{
    const ID = req.params.id
    const note = await NoteModel.find({_id:ID})
    const userID_in_note = note[0].userID 
    const userID_making_request = req.body.userID
    try{
        if(userID_in_note!=userID_making_request){
            res.send('You are not authorized')
        }else{
            await NoteModel.findByIdAndDelete({_id:ID})
        res.send(`Updated the note with id - ${ID}`)
        }
        
    }catch(err){
        console.log(err)
        res.send('Something went wrong')
    }
})

module.exports={
    NoteRouter
}