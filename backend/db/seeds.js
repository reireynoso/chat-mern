const User = require('../models/User')
const Message = require('../models/Message')
const Room = require('../models/Room')

const data = async() => {
    console.log('seed')
    Room.collection.deleteMany({})
    User.collection.deleteMany({})
    Message.collection.deleteMany({})

    await Room.insertMany([
        {name: "JS"},
        {name: "Ruby"},
        {name: "React"},
    ])
}

module.exports = data