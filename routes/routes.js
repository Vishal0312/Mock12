const express = require('express')
const ProductRouter = express.Router()
const {ProductModel} = require('../models/model')

ProductRouter.get('/',async(req,res)=>{
    try{
        const products = await ProductModel.find()
        res.send(products)
    }catch(err){
        console.log(err)
        res.send('Something wrong')
    }
})

ProductRouter.post('/create',async(req,res)=>{
    const data = req.body
    try{
        let Product = new ProductModel(data)
        await Product.save()
        res.send('Product is added')
    }catch(err){
        console.log(err)
        res.send('Something went wrong')
    }
    res.send("Added the Product")
})

ProductRouter.delete('/delete/:id',async(req,res)=>{
    const ID = req.params.id
    try{
            await ProductModel.findByIdAndUpdate({_id:ID})
        res.send(`Deleted the note with id - ${ID}`)
        }
        
    catch(err){
        console.log(err)
        res.send('Something went wrong')
    }
    
})

module.exports={
    ProductRouter
}