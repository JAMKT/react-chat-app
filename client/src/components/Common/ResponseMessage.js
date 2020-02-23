import React from 'react'

export default function ResponseMessage() {
    return (
        <div class="row margin-bot-s">
            <div class="message-profile-icon">
                <img src="https://via.placeholder.com/32" />
            </div>
            <div class="col">
                <div class="row justify-start">
                    <span>Username</span>
                </div>  
                <div class="row justify-start">
                    <p class="response-message-body">Message body goes here</p>
                </div>
            </div>
        </div>
    )
}
