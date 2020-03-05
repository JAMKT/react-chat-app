import React from 'react'
import ChatListItem from './ChatListItem';

const ChatList = (props) => {

    if (props.searching === true) {
        return (
            <div className="user-list col">
                {
                    
                }
            </div>
        )
    } else if(props.chats === null || props.chats === [] || props.chats === undefined){
        return(
            <div className="user-list col">
                Start chatting!
            </div>
        )
    } else {
        return (
            <div className="user-list col">
                {
                    props.chat.map((chat, index) => {
                        return <ChatListItem key={index} lastUpdate={chat.lastUpdate} id={chat._id} />
                    })
                }
            </div>
        )
    }
}

export default ChatList;