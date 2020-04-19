const express = require("express")
const path = require('path')
const http = require("http")
const socketio = require("socket.io")
const formatMessage = require('./utils/messages')
const {
    userJoin, 
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./utils/users')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

const botName = 'Bot'
// Set public folder as static folder so we can access the html files
app.use(express.static(path.join(__dirname, 'public')))

// run when client connects
io.on('connection', (socket) => {
    // listen for joinRoom
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room)
        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to the Chat')) // emit just to the user connecting

        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`)); //broadcasts to everyone but the connected user
        // io.emit(); //broadcasts to everyone

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })
       
    // listen for chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit('message', formatMessage(user.username, msg))
    })
    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)
        // console.log(user)
        if(user){
            io.to(user.room).emit(
                'message', 
                formatMessage(botName, `${user.username} has left the chat`))
        }
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {

    console.log("Running on " + PORT)
})