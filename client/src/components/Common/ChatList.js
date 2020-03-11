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
                        let name;
                        let userId;
                        let namesArray = [];

                        // Set chat name based on usernames 
                        if (chat.members.length > 2) {
                            chat.members.forEach((member) => {
                                if (member.username !== userContext.currUser.username) {
                                    namesArray.push(member.username);
                                    
                                    let names = namesArray.join(', ');

                                    name = names;
                                    userId = member.user; // TODO: Fix
                                }
                            });
                        } else {
                            chat.members.forEach((member) => {
                                if (member.username !== userContext.currUser.username) {
                                    name = member.username;
                                    userId = member.user;
                                }
                            });
                        }
             
                        return <ChatListItem
                            key={index}
                            id={chat._id}
                            userId={userId}
                            name={name}
                            lastUpdate={chat.lastUpdate}
                            created={chat.created}
                            retrieveChatId={props.retrieveChatId}
                        />
                    })
                }
            </div>
        )
    }
}

export default ChatList;