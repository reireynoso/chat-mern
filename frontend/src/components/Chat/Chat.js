import React, {useState,useEffect} from 'react'
import queryString from 'query-string' //helps retrieve data from url
import io from 'socket.io-client'

let socket;

const Chat = ({location}) => {

    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
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
        socket.emit('join', {name, room}, ({error}) => {
            console.log(error)
        }) 

        //unmounting 
        return () => {
            //emit a disconnect event
            socket.emit('disconnect')

            socket.off() //will turn off instance of socket
        }
    }, [ENDPOINT, location.search])
    return (
        <h1>CHat</h1>
    )
}

export default Chat