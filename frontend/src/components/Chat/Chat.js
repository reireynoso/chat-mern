import React, {useState,useEffect} from 'react'
import queryString from 'query-string' //helps retrieve data from url
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'

let socket;

const Chat = ({location}) => {

    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
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
        })
    }, [messages])

    //function for sending messages
    const sendMessage = (e) => {
        e.preventDefault()
        if(message){
            socket.emit('sendMessage', message, () => {
                setMessage('')
            })
        }
        console.log(message, messages)
    }
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
            </div>
        </div>
    )
}

export default Chat