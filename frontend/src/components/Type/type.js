import React from 'react'
import './type.css'

const Type = ({typers}) => {
    const checkWhich = (index) => {
        //index passed in accounts for the 0. 1 is added already
        if(typers.length === 1 || index === typers.length){ 
            return " "
        }
        else if(index + 1 === typers.length){ //compares next number to length
            return ", and "
        }
        else{
            return ", "
        }
    }

    return(
        <div className="typers-field">
            {typers.map((typer,index) => 
            <span key={`${index+typer}`}>{typer}
                {checkWhich(index + 1)} 
            </span>)}
            {typers.length === 1 ? "is" : "are"} typing...
        </div>
    )
}

export default Type