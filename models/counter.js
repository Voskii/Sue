const mongoose = require('mongoose')
const Schema = mongoose.Schema

const counterSchema = new Schema ({
    protein: {
        type: Number,
        required: false
    },
    sugar: {
        type: Number,
        required: false
    },
    fat: {
        type: Number,
        required: false
    },
    calories: {
        type: Number,
        required: false
    },
    created: {
        type: Array,
        required: false
    },
    mealId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Counter', counterSchema)