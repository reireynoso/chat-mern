const express = require('express')
const router = express.Router()
const Room = require('../models/Room')

router.get('/rooms', async(req,res) => {
    const rooms = await Room.find({})  
    res.send(rooms)
})

module.exports = router