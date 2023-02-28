const mongoose = require('mongoose')
require('dotenv').config()

const connection = mongoose.connect('mongodb+srv://Vishal:vishu@cluster0.a39ylps.mongodb.net/mock12?retryWrites=true&w=majority')

module.exports={
    connection
}