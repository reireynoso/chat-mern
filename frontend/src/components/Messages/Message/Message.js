import React from 'react'
import './Message.css'

import ReactEmoji from 'react-emoji'

const Message = ({message: {user,text, time},name}) => {
    // console.log(user, time)
    let isSentByCurrentUser = false

    const trimmedName = name.trim().toLowerCase()

    if(user === trimmedName){
        isSentByCurrentUser = true
    }
    return (
        isSentByCurrentUser ?
        (
            <div className="messageContainer">
                <div className="messageContainerInner justifyEnd">
                    <p className="sentText pr-10">{trimmedName}</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
                <p className="user-time">Sent: {time}</p>
            </div>
        )
        :
        (
            <div className="messageContainer">
                <div className="messageContainerInner justifyStart">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                    </div>
                    <p className="sentText pl-10">{user}</p>
                </div>
                <p>Sent: {time}</p>
            </div>
        )
    )
}

export default Message