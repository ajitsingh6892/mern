require ('dotenv').config()

const mongoose = require('mongoose')

const url = process.env.ATLAS_URI

const startConnection = async () =>{
    try {
        await mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false} )
        console.log("successfully connected to mongoDB ")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
module.exports = startConnection