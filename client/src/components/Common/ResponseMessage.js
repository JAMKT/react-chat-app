import React from 'react'

export default function ResponseMessage() {
    return (
        <div className="row margin-bot-s">
            <div className="message-profile-icon">
                <img src="https://via.placeholder.com/32" alt=""/>
            </div>
            <div className="col">
                <div className="row justify-start">
                    <span>Username</span>
                </div>  
                <div className="row justify-start">
                    <p className="response-message-body">Message body goes here</p>
                </div>
            </div>
        </div>
    )
}
