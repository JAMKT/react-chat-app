import React, { useContext, useEffect, useState } from 'react'
import ChatHeader from './ChatHeader';
import ResponseMessage from './ResponseMessage';
import Message from './Message';
import { useForm } from '../hooks/formHook';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const MainMessageChat = (props) => {
    const auth = useContext(AuthContext);
    const [message, setMessage] = useState(null);
    const [receiverMessage, setReceiverMessage] = useState(null);

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

        const chatId = props.chat._id;

        axios.post('/api/chats/' + chatId + '/messages', data, config)
            .then((newMessage) => {
                if (newMessage) {
                    console.log(newMessage);
                }
            })
            .catch(err => console.log(err));
    }

    const getMessages = () => {
        const chatId = props.chat._id;

        axios.get('/api/chats/' + chatId + '/messages')
            .then((messages) => {
                messages.data.messages.forEach((message) => {
                    if (message.author.id === auth.currUser._id) {
                        setMessage(<Message text={message.content}/>);
                    } else {
                        setReceiverMessage(<ResponseMessage text={message.content} username={message.author.username}/>)
                    }

                });
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (props.chat) {
            getMessages();
        }
    });

    if (props.chat !== null) {
        return (
            <div className="col main-message-chat absolute-center-pin full-height">
                <ChatHeader />
                <div className="row padding-16 scrollable">
                    {receiverMessage}
                    {message}
                </div>
                <form className="padding-16 chat-input-field-position" onSubmit={sendMessage}>
                    <input type="message" id="message" className="chat-input-field" placeholder="Type your message..." onInput={inputHandler} />
                </form>
            </div>
        );
    } else {
        return (
            <div>Select a chat</div>
        );
    }

}

export default MainMessageChat;
