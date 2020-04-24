const mongoose = require("mongoose")

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        uniqueness: true
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room