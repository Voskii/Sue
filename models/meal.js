const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mealSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
    },
    stats: {
        type: Array,
        
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eatWhen: {
        type: Number,
        default: 1,
        required: true
    }
})

module.exports = mongoose.model('Meal', mealSchema)

