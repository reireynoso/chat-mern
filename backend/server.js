const express = require("express")
const path = require('path')
const http = require("http")
const socketio = require("socket.io")

const app = express();
const server = http.createServer(app)
const io = socketio(server)
// Set public folder as static folder so we can access the html files
app.use(express.static(path.join(__dirname, 'public')))

// run when client connects
io.on('connection', (socket) => {
    
    // Welcome current user
    socket.emit('message', 'Welcome to the chat!') // emit just to the user connecting

    socket.broadcast.emit('message', "A user has joined the chat"); //broadcasts to everyone but the connected user
    
    // io.emit(); //broadcasts to everyone

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', "A user has left the chat")
    })

    // listen for chatMessage
    socket.on('chatMessage', (msg) => {
        console.log(msg)
        io.emit('message', msg)
    })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {

    console.log("Running on " + PORT)
})