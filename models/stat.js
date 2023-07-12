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
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    }
})

module.exports = mongoose.model('Stat', statSchema)