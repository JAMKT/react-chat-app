import React from 'react'

const Message = (props) => {
    return (
        <div className="row margin-bot-s">
            <div className="col"> 
                <div className="row justify-end">
                    <p className="message-body">{props.text}</p>
                </div>
            </div>
        </div>
    )
}

export default Message;