import React, { useContext } from 'react'
import ChatListItem from './ChatListItem';
import { AuthContext } from '../context/authContext';

const ChatList = (props) => {
    const userContext = useContext(AuthContext);
    console.log(userContext);
 
    if (props.searching === true) {
        return (
            <div className="user-list col padding-20 align-center">
                Searching...
            </div>
        )
    } else if (props.chats === null || props.chats.length === 0 || props.chats === undefined) {
        return (
            <div className="user-list col padding-20 align-center">
               <p>Start chatting with some friends!</p>
            </div>
        )
    } else {
        return (
            <div className="user-list col">
                {
                    props.chats.map((chat, index) => {
                        var name;
                        let userId;
                       
                        chat.members.forEach((member) => {
                            //console.log(member);
                            if (member.username !== userContext.currUser.username) {
                                name = member.username;
                                userId = member.user;
                            }
                        })
             
                        return <ChatListItem
                            key={index}
                            id={chat._id}
                            userId={userId}
                            name={name} // TODO: Change name to dynamic value
                            lastUpdate={chat.lastUpdate}
                            retrieveChatId={props.retrieveChatId}
                        />
                    })
                }
            </div>
        )
    }
}

export default ChatList;