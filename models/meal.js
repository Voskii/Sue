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
    stats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stat',
        required: false
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Meal', mealSchema)