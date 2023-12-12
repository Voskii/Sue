const mongoose = require('mongoose')
const Schema = mongoose.Schema

const counterSchema = new Schema ({
    protein: {
        type: Number,
        default: 0,
        required: false
    },
    sugar: {
        type: Number,
        default: 0,
        required: false
    },
    fat: {
        type: Number,
        default: 0,
        required: false
    },
    calories: {
        type: Number,
        default: 0,
        required: false
    },
    created: {
        type: Array,
        required: false
    },
    mealId: {
        type: String,
        required: false
    },
    userId:{
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Counter', counterSchema)