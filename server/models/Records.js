const mongoose = require('mongoose')

const RecordSchema = new mongoose.Schema({
    person_name: {
        type: String,
        required: true
    },
    person_position: {
        type: String,
        required: true
    },
    person_level:{
        type:String,
        required:true
    }
    
})


module.exports = mongoose.model('records', RecordSchema)