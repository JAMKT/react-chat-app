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
                    props.chats.map((chat, index) => {
                        return <ChatListItem 
                            key={index} 
                            id={chat._id} 
                            name={'random name'} // TODO: Change name to dynamic value
                            lastUpdate={chat.lastUpdate} 
                        />
                    })
                }
            </div>
        )
    }
}

export default ChatList;