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
    console.log('new connection')
    socket.emit('message', 'welcome')
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
      console.log("Running on " + PORT)
})