const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dubSchema = new Schema({
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
    value: {
        type: String,
        required: false
    },
    eatWhen: {
        type: String,
        required: true
    },
    mealId: {
        type: String,
        required: true
    },
    mealCount: {
        type: Array,
        required: false
    }
})

module.exports = mongoose.model('Dub', dubSchema)
// ,
//     position: {
//         type: Number,
//         required: true
//     }