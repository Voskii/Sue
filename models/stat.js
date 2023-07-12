const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statSchema = new Schema ({
    name: {
        type: String,
        required: false
    },
    value: {
        type: Number,
        required: false
    },
    mealId: {
        type: String,
        
        required: false
    }
})

module.exports = mongoose.model('Stat', statSchema)