require('dotenv').config()
const express=require("express")
const vendorRoutes=require('./routes/vendorRoutes')
const firmRoutes=require('./routes/firmRoutes')
const productRoutes=require('./routes/productRoutes')
const bodyParser=require('body-parser')
const path=require('path')
const app=express()
const mongoose=require("mongoose")
const db=process.env.MONGOURI
const PORT=process.env.PORT || 4000

mongoose.connect(db)
    .then(()=>{
        console.log("database connected")
    })
    .catch((error)=>{
        console.log(`there was an error ${error}`)
    })


app.use(bodyParser.json())
app.use('/vendor',vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))

app.listen(PORT,()=>{
    console.log(`server created and running at ${PORT}`)
})


app.use('/',(req,res)=>{
    res.send("<h1>Welcome to Suby</h1>")
})