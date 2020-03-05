import React, { useContext } from 'react'
import ChatListItem from './ChatListItem';
import { AuthContext } from '../context/authContext';

const ChatList = (props) => {
    const userContext = useContext(AuthContext);

    if (props.searching === true) {
        return (
            <div className="user-list col padding-20 align-center">
                Searching...
            </div>
        )
    } else if (props.chats === null || props.chats === [] || props.chats === undefined) {
        return (
            <div className="user-list col padding-20 align-center">
                Start chatting!
            </div>
        )
    } else {
        return (
            <div className="user-list col">
                {
                    props.chats.map((chat, index) => {
                        var name;
                        chat.members.forEach((member) => {
                            if (member.username !== userContext.currUser.username) {
                                name = member.username;
                            }
                        })

                        return <ChatListItem
                            key={index}
                            id={chat._id}
                            name={name} // TODO: Change name to dynamic value
                            lastUpdate={chat.lastUpdate}
                        />
                    })
                }
            </div>
        )
    }
}

export default ChatList;