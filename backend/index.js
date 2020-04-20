const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 4000
const app = express();

const router = require('./router')

app.use(router)

// if you want to do something real-time, use sockets, not http. They are slow. 
// good for serving up websites.

const server = http.createServer(app);
const io = socketio(server); //instance of socketio

//register clients joining and leaving the chat application
io.on('connection', (socket) => {
    console.log('we have new connection')

    //managing the specific socket
    socket.on('disconnect', () => {
        console.log("user had left")
    })
})

server.listen(PORT, () => {
    console.log("Server in on " + PORT)
})