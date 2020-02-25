import React, { Component } from 'react'
import ChatHeader from './ChatHeader';
import ResponseMessage from './ResponseMessage';
import Message from './Message';

export default class MainMessageChat extends Component {
    render() {
        return (
            <div class="col main-message-chat absolute-center-pin full-height">
                <ChatHeader />
                <div class="row padding-16">
                    <ResponseMessage />
                    <ResponseMessage />
                    <ResponseMessage />
                    <Message />
                </div>
                <div class="padding-16 chat-input-field-position">
                    <input type="text" class="chat-input-field" placeholder="Type your message..." />
                </div>  
                
            </div>
        )
    }
}
