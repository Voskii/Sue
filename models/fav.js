const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favSchema = new Schema ({
    name: {
        type: String,
        required: false
    },
    stats: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Fav', favSchema)