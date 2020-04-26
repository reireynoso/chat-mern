const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const moment = require('moment')
const cors = require('cors')
require('./db/mongoose')
const dbseeds = require('./db/seeds')
const User = require('./models/User')
const roomRoutes = require('./controllers/RoomController')

const {addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const PORT = process.env.PORT || 4000
const app = express();
app.use(cors())
app.use(roomRoutes)
// const router = require('./router')

// app.use(router)

// if you want to do something real-time, use sockets, not http. They are slow. 
// good for serving up websites.

const server = http.createServer(app);
const io = socketio(server); //instance of socketio

//register clients joining and leaving the chat application
io.on('connection', (socket) => {
    console.log('we have new connection')

    //handler for receiving emit from client. first arg has to match
    //On socket.on, and socket.emit, the callback func can take in another callback func as a second arg in params
    socket.on('join', async({name, room}, callback) => {
        const {error, user} = addUser({id: socket.id, name, room})

         if(error){
            return callback(error)
        }

        // const user = new User({name,room})  
        // try{
        //     await user.save()

            socket.join(user.room) //joins a user in a room

            socket.emit('message', {user: 'admin', text: `${user.name}. Welcome to the room, ${user.room}`, time: moment().format('h:mm a')})
            socket.broadcast.to(user.room).emit('message', {user: 'admin', text:`${user.name} has joined`, time: moment().format('h:mm a')})// will send a message to everyone but that user
            // const error = true;
            // if(error){
            //     callback({error: 'error'}) // trigger a response after socket.on is being emitted , error handling
            // }
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
            callback();
        // }catch(e){
        //     res.status(400)
        //     return callback(e)
        // }
       
    })

    socket.on('typing', (info, callback) => {
        // console.log(info)
        socket.broadcast.to(info.room).emit('typing', info)
        callback()
    })

    // event for user generated messages
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        // console.log(message)
        socket.to(user.room).emit('typing', {name: user.name, value: "", room: user.room})
        io.to(user.room).emit('message', {user: user.name, text: message, time: moment().format('h:mm a')})
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
        callback()
    })

    //managing the specific socket
    socket.on('disconnect', () => {
        // console.log("user had left")
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`, time: moment().format('h:mm a')})
        }
    })
})

server.listen(PORT, () => {
    // dbseeds()
    console.log("Server in on " + PORT)
})