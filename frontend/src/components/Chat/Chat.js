import React, {useState,useEffect} from 'react'
import queryString from 'query-string' //helps retrieve data from url
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'

let socket;

const Chat = ({location}) => {

    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState([])
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:4000'
    

    useEffect(() => {

        //retrieve data once entering
        const {name, room} = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        //emit events from client side sockets
        //1st argument can be named anything
        //string that the backend can recognize
        //with emit, you can pass it data.
        //emit can take in a third argument for error
        socket.emit('join', {name, room}, (error) => {
            // console.log(error)
        }) 

        //unmounting 
        return () => {
            //emit a disconnect event
            socket.emit('disconnect')

            socket.off() //will turn off instance of socket
        }
    }, [ENDPOINT, location.search])

    //handle messaging
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
            console.log(message)
        })
    }, [messages])

    // get users in room
    useEffect(() => {
        socket.on('roomData', (users) => {
            // console.log(users)
            setUsers(users.users)
        })

        // console.log(users)
    }, [users])

    //function for sending messages
    const sendMessage = (e) => {
        e.preventDefault()
        if(message){
            socket.emit('sendMessage', message, () => {
                setMessage('')
            })
        }
    }
    return (
        
        <div className="outerContainer">
            
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat