import React, { Component } from 'react'
import ChatHeader from './ChatHeader';
import ResponseMessage from './ResponseMessage';
import Message from './Message';

export default class MainMessageChat extends Component {
    render() {
        return (
            <div className="col main-message-chat absolute-center-pin full-height">
                <ChatHeader />
                <div className="row padding-16 scrollable">
                    <ResponseMessage />
                    <ResponseMessage />
                    <ResponseMessage />
                    <Message />
                </div>
                <div className="padding-16 chat-input-field-position">
                    <input type="text" className="chat-input-field" placeholder="Type your message..." />
                </div>  
                
            </div>
        )
    }
}
