const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    mealId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Stat', statSchema)