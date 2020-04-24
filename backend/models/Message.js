const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        uniqueness: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    }
    
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message