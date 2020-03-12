import React, { useContext, useEffect, useState } from 'react'
import ChatHeader from './ChatHeader';
import ResponseMessage from './ResponseMessage';
import Message from './Message';
import { useForm } from '../hooks/formHook';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const MainMessageChat = (props) => {
    const auth = useContext(AuthContext);
    const [messages, setMessages] = useState([]);

    const [formState, inputHandler] = useForm(
        //set inital input state + form validity state
        {
            message: {
                value: '',
                isValid: false
            }
        },
        {
            isValid: false
        }
    );

    const sendMessage = (event) => {
        event.preventDefault();
        const data = {
            content: document.getElementById("message").value,
            author: {
                id: auth.currUser._id,
                username: auth.currUser.username
            }
        }

        document.getElementById("message").value = "";

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios.post('/api/chats/' + props.chat._id + '/messages', data, config)
            .then((newMessage) => {
                if (newMessage) {
                    console.log(newMessage);
                }
            })
            .catch(err => console.log(err));
    }

    const getMessages = () => {
        axios.get('/api/chats/' + props.chat._id + '/messages')
            .then((messages) => {
                setMessages(messages.data.messages);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (props.chat) {
            getMessages();
        }
    });


    if (props.chat !== null && typeof props.chat !== 'undefined') {
        let name;
        let userId;
        let namesArray = [];

        // Set chat name based on usernames 
        if (props.chat.members.length > 2) {
            props.chat.members.forEach((member) => {
                if (member.username !== auth.currUser.username) {
                    namesArray.push(member.username);
                    
                    let names = namesArray.join(', ');

                    name = names;
                    userId = member.user; // TODO: Fix
                }
            });
        } else {
            props.chat.members.forEach((member) => {
                if (member.username !== auth.currUser.username) {
                    name = member.username;
                    userId = member.user;
                }
            });
        }


        return (
            <div className="col main-message-chat absolute-center-pin full-height">
                <ChatHeader name={name} userId={userId} unselectChat={props.unselectChat} />
                <div className="row padding-16 scrollable">
                    {
                        messages !== [] ?
                            messages.map((msg, index) => {
                                let text;
                                msg.author.id === auth.currUser._id ?
                                    text = (<Message text={msg.content} key={index} />) :
                                    text = (<ResponseMessage text={msg.content} username={msg.author.username} key={index} />)
                                return text;
                            }) : null
                    }
                </div>
                <form className="padding-16 chat-input-field-position" onSubmit={sendMessage}>
                    <input type="message" id="message" className="chat-input-field" placeholder="Type your message..." onInput={inputHandler} />
                </form>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }

}

export default MainMessageChat;
