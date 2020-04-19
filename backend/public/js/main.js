const chatForm = document.getElementById("chat-form")
const chatMessages = document.querySelector('.chat-messages')
const socket = io();

// message from server
socket.on('message', message => {
    console.log(message)
    outputMessage(message)

    // scroll down auto
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get message text
    const msg = e.target.elements.msg.value

    // emit message to the server
    socket.emit('chatMessage', msg)
    
    // clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus()
})

// output message to DOM

const outputMessage = (message) => {
    const div = document.createElement('div')
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
        <p class="text">
            ${message}
        </p>`
    document.getElementsByClassName("chat-messages")[0].append(div)
}