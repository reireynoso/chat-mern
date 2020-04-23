import React from 'react'
import './type.css'

const Type = ({typers}) => {
    return(
        <div className="typers-field">
            {typers.map(typer => <span>{typer} </span>)}
            is typing...
        </div>
    )
}

export default Type