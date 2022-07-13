const mongoose = require('mongoose');

const deckSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    author: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: [true, 'Please add a subject']
    },
    title: {
        type: String,
        require: [true, 'Please add a title']
    },
    likes: {
        type: Number,
        default: 0
    },
    published: {
        type: Boolean,
        default: false
    },
    cards: {
        type: Array
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('decks', deckSchema)
