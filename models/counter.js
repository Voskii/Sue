const mongoose = require('mongoose')
const Schema = mongoose.Schema

const counterSchema = new Schema ({
    protein: {
        type: String,
        required: false
    },
    sugar: {
        type: String,
        required: false
    },
    calories: {
        type: String,
        required: false
    },
    fat: {
        type: String,
        required: false
    },
    created: {
        type: Array,
        required: false
    }
})

module.exports = mongoose.model('Counter', counterSchema)