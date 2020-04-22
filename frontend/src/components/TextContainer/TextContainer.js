import React from 'react'
import './TextContainer.css'

const TextContainer = ({users}) => {
    // console.log(users)
    return (
        <div className="user-container">
            <div className="user-header">
                <h3>Users</h3>
            </div>

            <div className="user-body">
                {
                    users.map(user => <div className="user-segment" key={user.id}>
                            {
                                user.name
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default TextContainer